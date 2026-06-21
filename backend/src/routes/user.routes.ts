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

router.get('/stats', getStats);
router.post('/', validate(createUserSchema), createUser);
router.get('/', validate(getAllUsersSchema), getAllUsers);
router.get('/:id', validate(getUserByIdSchema), getUserById);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', validate(getUserByIdSchema), deleteUser);

export default router;