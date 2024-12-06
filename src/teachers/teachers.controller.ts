import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
@IsPublic()
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @IsPublic()
  @Post()
  create(@Body(ValidationPipe) createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @IsPublic()
  @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.teacherService.remove(id);
    }

  @Post(':id/subjects')
  async addSubject(
    @Param('id') teacherId: string,
    @Body('subject') subject: string,
  ): Promise<string> {
    try {
      await this.teacherService.addSubjectToTeacher(teacherId, subject, {});
      return `Subject "${subject}" added to teacher with ID ${teacherId}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}