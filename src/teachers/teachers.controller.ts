import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { SubjectsService } from 'src/subjects/subjects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@IsPublic()
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @IsPublic()
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async createTeacher(
    @Body('name') name: string,
    @Body('department') department: string,
    @UploadedFile() file: Multer.File,
    @Body('subjectNames') subjectNames?: string[],
  ) {
    console.log(file);
    const photo = file ? file.buffer.toString('base64') : undefined;
    return this.teacherService.create(name, department, subjectNames, photo);
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
    @Param('subjectId') subjectId: string,
  ) {
    return this.teacherService.addSubjectToTeacher(teacherId, subjectId);
  }
}
