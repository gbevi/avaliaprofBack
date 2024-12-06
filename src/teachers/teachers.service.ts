import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTeacherDto: Prisma.TeacherCreateInput) {

    return this.databaseService.teacher.create({ data: createTeacherDto });
  }

  async findAll() {
    return this.databaseService.teacher.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.databaseService.teacher.findUnique({
      where: {
        id: id,
      },
      include: { evaluations: true },
    });
  }

  async update(id: string, updateTeacherDto: Prisma.TeacherUpdateInput) {
    return this.databaseService.teacher.update({
      where: { id: id },
      data: updateTeacherDto,
    });
  }

  async addSubjectToTeacher(id: string,subject:string, updateTeacherDto: Prisma.TeacherUpdateInput){
    const teacher = await this.databaseService.teacher.findUnique({
      where: { id: id },
    });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    if (teacher.subjects.includes(subject)) {
      throw new Error('Subject already added to this teacher');
    }
    await this.databaseService.teacher.update({
      where: { id: id },
      data: {
        subjects: {
          push: subject,
        },
      },
    });
  }

  async searchTeachersByName(searchTerm: string): Promise<any[]> {
    return this.databaseService.teacher.findMany({
      where: {
        name: {
          contains: searchTerm, // Realiza a busca parcial
          mode: 'insensitive', // Ignora diferenciação entre maiúsculas e minúsculas
        },
      },
      select: {
        name: true,
        subjects: true,
      },
    });
  }

  async remove(id: string) {
    return this.databaseService.teacher.delete({
      where: {
        id: id,
      },
    });
  }
}