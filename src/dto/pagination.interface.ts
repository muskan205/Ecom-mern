// dto/pagination.interface.ts

export interface PaginationOptions {
    page: number;
    limit: number;
    repository: any; 
  filters?:{} |any
  }
  
  export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  