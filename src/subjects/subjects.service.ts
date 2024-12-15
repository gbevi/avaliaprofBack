import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  create(createSubjectDto: Prisma.SubjectCreateInput) {
    return this.databaseService.subject.create({ data: createSubjectDto });
  }

  findAll() {
    return this.databaseService.subject.findMany();
  }

  async findOne(id: string) {
      if (!id) {
        throw new NotFoundException('User not found');
      }
      return this.databaseService.subject.findUnique({
        where: {
          id: id,
        },
      });
    }

    async update(id: string, updateSubjectDto: Prisma.SubjectUpdateInput) {
      return this.databaseService.subject.update({
        where: { id: id },
        data: updateSubjectDto,
      });
    }

    async remove(id: string) {
      return this.databaseService.subject.delete({
        where: {
          id: id,
        },
      });
    }
}
