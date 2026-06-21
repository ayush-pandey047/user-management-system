export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export const getPaginationMeta = (page: number, limit: number) => ({
    skip: (page - 1) * limit,
    take: limit,
  });