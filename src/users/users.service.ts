import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto}).catch((e) => {});
  }

  async findAll() {
    return this.databaseService.user.findMany().catch((e) => {});
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({ where: { id } }).catch((e) => {});
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({ where: { id }, data: updateUserDto }).catch((e) => {});
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id } }).catch((e) => {});
  }
}
