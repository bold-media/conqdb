import { PgSelect } from 'drizzle-orm/pg-core';

export interface Pagination {
  limit: number;
  page: number;
  totalRecords: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export function withPagination<T extends PgSelect>({
  qb,
  page = 1,
  limit = 10,
}: {
  qb: T;
  page: number;
  limit: number;
}): T {
  return qb.limit(limit).offset((page - 1) * limit);
}
