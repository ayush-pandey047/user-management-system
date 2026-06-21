import { z } from 'zod';
import { REGEX } from '@constants/regex';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(150),
    email: z.string().email('Invalid email format'),
    primaryMobile: z.string().regex(REGEX.MOBILE, 'Primary mobile must be exactly 10 digits'),
    secondaryMobile: z.string().regex(REGEX.MOBILE, 'Secondary mobile must be exactly 10 digits').optional().nullable(),
    aadhaar: z.string().regex(REGEX.AADHAAR, 'Aadhaar must be exactly 12 digits'),
    pan: z.string().regex(REGEX.PAN, 'PAN must match format ABCDE1234F'),
    dateOfBirth: z.coerce.date().refine((date) => !isNaN(date.getTime()), { message: 'Invalid date of birth' }),
    placeOfBirth: z.string().min(2).max(150),
    currentAddress: z.string().min(5, 'Current address is too short'),
    permanentAddress: z.string().min(5, 'Permanent address is too short'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user id'),
  }),
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    email: z.string().email().optional(),
    primaryMobile: z.string().regex(REGEX.MOBILE).optional(),
    secondaryMobile: z.string().regex(REGEX.MOBILE).optional().nullable(),
    aadhaar: z.string().regex(REGEX.AADHAAR).optional(),
    pan: z.string().regex(REGEX.PAN).optional(),
    dateOfBirth: z.coerce.date().optional(),
    placeOfBirth: z.string().min(2).max(150).optional(),
    currentAddress: z.string().min(5).optional(),
    permanentAddress: z.string().min(5).optional(),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user id'),
  }),
});

export const getAllUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    search: z.string().optional(),
    sortBy: z.enum(['name', 'email', 'createdAt']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];