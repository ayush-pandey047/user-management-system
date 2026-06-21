import prisma from '@config/database';
import { Prisma } from '@prisma/client';

export class UserRepository {
  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  findById(id: string) {
    return prisma.user.findFirst({ where: { id, isDeleted: false } });
  }

  findByEmail(email: string) {
    return prisma.user.findFirst({ where: { email, isDeleted: false } });
  }

  findByAadhaarOrPan(aadhaar: string, pan: string) {
    return prisma.user.findFirst({
      where: { OR: [{ aadhaar }, { pan }], isDeleted: false },
    });
  }

  async findAll(params: {
    skip: number;
    take: number;
    search?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }) {
    const { skip, take, search, sortBy, sortOrder } = params;

    const where: Prisma.UserWhereInput = {
      isDeleted: false,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.user.count({ where }),
    ]);

    return { data, total };
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data: { ...data, version: { increment: 1 } },
    });
  }

  softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  countStats() {
    return prisma.$transaction([
      prisma.user.count(),
      prisma.user.count({ where: { isDeleted: false } }),
      prisma.user.count({ where: { isDeleted: true } }),
    ]);
  }
}

export default new UserRepository();