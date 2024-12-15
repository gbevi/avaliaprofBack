import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.databaseService.user.create({ data: user });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.databaseService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateUserDto: Prisma.UserUpdateInput & {
      currentPassword?: string;
      newPassword?: string;
    },
  ) {
    const { currentPassword, newPassword, ...otherUpdates } = updateUserDto;

    if (currentPassword && newPassword) {
      // Valida a senha atual
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        throw new Error('Senha atual incorreta.');
      }

      // Hash da nova senha
      otherUpdates.password = await bcrypt.hash(newPassword, 10);
    }

    // Atualiza os campos no banco de dados
    return this.databaseService.user.update({
      where: { id },
      data: otherUpdates,
    });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
