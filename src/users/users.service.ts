import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;
    return this.databaseService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(
        updateUserDto.password,
        roundsOfHashing,
      );
    }
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
