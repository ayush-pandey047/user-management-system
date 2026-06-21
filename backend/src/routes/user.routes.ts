import { Router } from 'express';
import { validate } from '@middlewares/validate';
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
  getAllUsersSchema,
} from '@validators/user.validator';
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getStats,
} from '@controllers/user.controller';

const router = Router();

/**
 * @openapi
 * /users/stats:
 *   get:
 *     summary: Get user statistics (total, active, deleted)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Stats fetched successfully
 */
router.get('/stats', getStats);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email/Aadhaar/PAN already exists
 *       422:
 *         description: Validation failed
 *   get:
 *     summary: Get all users (paginated, searchable, sortable)
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [name, email, createdAt] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc] }
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.post('/', validate(createUserSchema), createUser);
router.get('/', validate(getAllUsersSchema), getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Soft delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.get('/:id', validate(getUserByIdSchema), getUserById);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', validate(getUserByIdSchema), deleteUser);

export default router;