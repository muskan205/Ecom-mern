import { Repository } from "typeorm";

export interface PaginationOptions {
  page: number;
  limit: number;
  repository: Repository<any>;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
