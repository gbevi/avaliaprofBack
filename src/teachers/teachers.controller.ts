import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { SubjectsService } from 'src/subjects/subjects.service';
@IsPublic()
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly subjectsService: SubjectsService
  ) {}
  

  @IsPublic()
  @Post()
createTeacher(
  @Body('name') name: string,
  @Body('department') department: string,
  @Body('subjectNames') subjectNames?: string[],
) {
  return this.teacherService.create(name,department, subjectNames);
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


  @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.teacherService.remove(id);
    }

    @Patch(':teacherId/:subjectId')
    addSubjectToTeacher(
      @Param('teacherId') teacherId: string,
      @Param('subjectId') subjectId: string,) {
        return this.teacherService.addSubjectToTeacher(teacherId, subjectId);
    }

}