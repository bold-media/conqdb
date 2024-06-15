export interface IPaginateOptions {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: Record<string, any>;
}

export interface IPaginateResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
