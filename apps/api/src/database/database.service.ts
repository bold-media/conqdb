import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from './schema/index.schema';
import { PgTable } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { withPagination } from './utils/withPagination';

export interface QueryStringPagination<T> {
  page: number;
  limit: number;
  filters?: Partial<Record<keyof T, any>>;
  sortField?: keyof T;
  sortOrder?: 'asc' | 'desc';
}

export interface Pagination {
  limit: number;
  page: number;
  totalRecords?: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  public constructor(private readonly configService: ConfigService) {}

  public getDB(): PostgresJsDatabase<typeof schema> {
    const client = postgres(this.configService.get<string>('POSTGRES_URL'));

    return drizzle(client, { schema, logger: true });
  }

  async paginateQuery<T>({
    schema,
    queryStringPagination,
  }: {
    schema: PgTable;
    queryStringPagination: QueryStringPagination<T>;
  }): Promise<{ data: T[]; pagination: Pagination }> {
    try {
      const { page, limit, filters, sortField, sortOrder } =
        queryStringPagination;
      const db = this.getDB();
      let dynamicQuery = db.select().from(schema).$dynamic();
      let countQuery = db
        .select({ total: sql<number>`count(*)` })
        .from(schema)
        .$dynamic();

      // Apply filters
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          dynamicQuery = dynamicQuery.where(
            sql`${sql.identifier(key)} = ${value}`,
          );
          countQuery = countQuery.where(sql`${sql.identifier(key)} = ${value}`);
        }
      }

      // Apply sorting
      if (sortField && sortOrder) {
        dynamicQuery = dynamicQuery.orderBy(
          sql`${sql.identifier(sortField as string)} ${sql.raw(sortOrder)}`,
        );
      }

      // Apply pagination
      dynamicQuery = withPagination({ qb: dynamicQuery, page, limit });

      // Execute query
      const results = (await dynamicQuery.execute()) as T[];

      const totalRecordsResult = await countQuery.execute();
      const totalRecords = Number(totalRecordsResult[0].total);

      // Calculate pagination metadata
      const pagination = this.calculatePagination(totalRecords, page, limit);

      return { data: results, pagination };
    } catch (error) {
      this.logger.error('Error executing paginateQuery', error);
      throw error;
    }
  }

  private calculatePagination(
    totalRecords: number,
    page: number,
    limit: number,
  ): Pagination {
    const totalPages = Math.ceil(totalRecords / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    return {
      limit,
      page,
      totalRecords,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
    };
  }
}
