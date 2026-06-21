import axiosInstance from '@/api/axiosInstance';
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  PaginatedResponse,
  ApiResponse,
  UserStats,
} from '@/types/user.types';

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const userService = {
  getAll: async (params: GetUsersParams): Promise<PaginatedResponse<User>> => {
    const res = await axiosInstance.get('/users', { params });
    return res.data;
  },

  getById: async (id: string): Promise<User> => {
    const res = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);
    return res.data.data;
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const res = await axiosInstance.post<ApiResponse<User>>('/users', payload);
    return res.data.data;
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    const res = await axiosInstance.put<ApiResponse<User>>(`/users/${id}`, payload);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  },

  getStats: async (): Promise<UserStats> => {
    const res = await axiosInstance.get<ApiResponse<UserStats>>('/users/stats');
    return res.data.data;
  },
};