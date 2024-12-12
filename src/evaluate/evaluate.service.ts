import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EvaluateService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEvaluateDto: Prisma.EvaluateCreateInput) {
    return this.databaseService.evaluate.create({ data: createEvaluateDto });
  }

  async findAll() {
    return this.databaseService.evaluate.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.databaseService.evaluate.findUnique({
      where: {
        id: id,
      },
    });
  }
  async update(id: string, updateEvaluateDto: Prisma.EvaluateUpdateInput) {
    return this.databaseService.evaluate.update({
      where: { id: id },
      data: updateEvaluateDto,
    });
  }
  async remove(id: string) {
    return this.databaseService.evaluate.delete({
      where: {
        id: id,
      },
    });
  }

  async findByTeacher(teacherid: string) {
    return this.databaseService.evaluate.findMany({
      where: {
        teacherId: teacherid,
      },
    });
  }
  
  async findAllByUser(userId: string) {
    return this.databaseService.evaluate.findMany({
      where: {
        UserId: userId,
      },
    });
  }
}