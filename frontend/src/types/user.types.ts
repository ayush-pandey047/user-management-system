export interface User {
    id: string;
    name: string;
    email: string;
    primaryMobile: string;
    secondaryMobile: string | null;
    aadhaar: string;
    pan: string;
    dateOfBirth: string;
    placeOfBirth: string;
    currentAddress: string;
    permanentAddress: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  
  export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination: PaginationMeta;
  }
  
  export interface UserStats {
    total: number;
    active: number;
    deleted: number;
  }
  
  export type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateUserPayload = Partial<CreateUserPayload>;