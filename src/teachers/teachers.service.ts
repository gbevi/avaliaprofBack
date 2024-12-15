import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(name: string,department:string, subjectNames?: string[]) {
    const subjectIds: string[] = [];
  
    if (subjectNames && subjectNames.length > 0) {

      const existingSubjects = await this.databaseService.subject.findMany({
        where: { name: { in: subjectNames } },
      });

      subjectIds.push(...existingSubjects.map((subject) => subject.id));
   
      const existingNames = existingSubjects.map((subject) => subject.name.toLowerCase());
      const newSubjects = subjectNames.filter(
        (name) => !existingNames.includes(name.toLowerCase())
      );

      for (const newName of newSubjects) {
        const newSubject = await this.databaseService.subject.create({
          data: { name: newName },
        });
        subjectIds.push(newSubject.id);
      }
    }
  
    return this.databaseService.teacher.create({
      data: {
        name,
        department,
        subjects: { connect: subjectIds.map((id) => ({ id })) },
      },
    });
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
      include: { evaluations: true, subjects: true },
    });
  }

  async update(id: string, updateTeacherDto: { name?: string; subjectNames?: string[] }) {
    const { name, subjectNames } = updateTeacherDto;
    const subjectIds: string[] = [];
  
    if (subjectNames && subjectNames.length > 0) {

      const existingSubjects = await this.databaseService.subject.findMany({
        where: { name: { in: subjectNames } },
      });
  
      subjectIds.push(...existingSubjects.map((subject) => subject.id));
  
      const existingNames = existingSubjects.map((subject) => subject.name.toLowerCase());
      const newSubjects = subjectNames.filter(
        (name) => !existingNames.includes(name.toLowerCase())
      );

      for (const newName of newSubjects) {
        const newSubject = await this.databaseService.subject.create({
          data: { name: newName },
        });
        subjectIds.push(newSubject.id);
      }
    }
  
    return this.databaseService.teacher.update({
      where: { id },
      data: {
        ...(name && { name }), 
        ...(subjectIds.length > 0 && {
          subjects: {
            set: subjectIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  async searchTeachersByName(searchTerm: string): Promise<any[]> {
    return this.databaseService.teacher.findMany({
      where: {
        name: {
          contains: searchTerm, 
          mode: 'insensitive', 
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

  async addSubjectToTeacher(teacherId: string, subjectId: string) {
    return this.databaseService.teacher.update({
      where: { id: teacherId },
      data: {
        subjects: {
          connect: { id: subjectId },
        },
      },
    });
  }
}