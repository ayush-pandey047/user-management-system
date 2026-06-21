import { Request, Response } from 'express';
import userService from '@services/user.service';
import { ApiResponse } from '@utils/apiResponse';
import { asyncHandler } from '@middlewares/asyncHandler';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  return ApiResponse.success(res, user, 'User created successfully', 201);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const user = await userService.getUserById(userId);
  return ApiResponse.success(res, user, 'User fetched successfully');
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const q = (req as any).validatedQuery;
  const { data, total } = await userService.getAllUsers(q);
  return ApiResponse.paginated(res, data, q.page, q.limit, total, 'Users fetched successfully');
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const user = await userService.updateUser(userId, req.body);
  return ApiResponse.success(res, user, 'User updated successfully');
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await userService.deleteUser(userId);
  return ApiResponse.success(res, null, 'User deleted successfully');
});

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await userService.getStats();
  return ApiResponse.success(res, stats, 'Stats fetched successfully');
});