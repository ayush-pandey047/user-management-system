import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, GetUsersParams } from '@/services/userService';
import { CreateUserPayload, UpdateUserPayload } from '@/types/user.types';
import { toast } from 'sonner';

export const useUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getAll(params),
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['users-stats'],
    queryFn: () => userService.getStats(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => userService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users-stats'] });
      toast.success('User created successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to create user'),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      userService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to update user'),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users-stats'] });
      toast.success('User deleted successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to delete user'),
  });
};