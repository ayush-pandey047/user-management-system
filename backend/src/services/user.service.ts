import userRepository from '@repositories/user.repository';
import { NotFoundError, ConflictError } from '@exceptions/AppError';
import { CreateUserInput, UpdateUserInput } from '@validators/user.validator';
import { toUserResponseDto } from '@dtos/user.dto';

export class UserService {
  async createUser(input: CreateUserInput) {
    const emailExists = await userRepository.findByEmail(input.email);
    if (emailExists) throw new ConflictError('Email already registered');

    const idExists = await userRepository.findByAadhaarOrPan(input.aadhaar, input.pan);
    if (idExists) throw new ConflictError('Aadhaar or PAN already registered');

    const user = await userRepository.create(input);
    return toUserResponseDto(user);
  }

  async getUserById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return toUserResponseDto(user);
  }

  async getAllUsers(params: {
    page: number;
    limit: number;
    search?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }) {
    const skip = (params.page - 1) * params.limit;
    const { data, total } = await userRepository.findAll({
      skip,
      take: params.limit,
      search: params.search,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    });
    return { data: data.map(toUserResponseDto), total };
  }

  async updateUser(id: string, input: UpdateUserInput) {
    const existing = await userRepository.findById(id);
    if (!existing) throw new NotFoundError('User not found');

    if (input.email && input.email !== existing.email) {
      const emailExists = await userRepository.findByEmail(input.email);
      if (emailExists) throw new ConflictError('Email already registered');
    }

    const updated = await userRepository.update(id, input);
    return toUserResponseDto(updated);
  }

  async deleteUser(id: string) {
    const existing = await userRepository.findById(id);
    if (!existing) throw new NotFoundError('User not found');
    await userRepository.softDelete(id);
  }

  async getStats() {
    const [total, active, deleted] = await userRepository.countStats();
    return { total, active, deleted };
  }
}

export default new UserService();