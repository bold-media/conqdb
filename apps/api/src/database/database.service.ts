import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from './schema/index.schema';

@Injectable()
export class DatabaseService {
  public constructor(private readonly configService: ConfigService) {}

  public getDB(): PostgresJsDatabase<typeof schema> {
    const client = postgres(this.configService.get<string>('POSTGRES_URL'));

    return drizzle(client, { schema, logger: true  });
  }
}