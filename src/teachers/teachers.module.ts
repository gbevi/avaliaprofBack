import { Module } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { TeacherController } from './teachers.controller';
import { DatabaseModule } from '../database/database.module';
import { SubjectsService } from '../subjects/subjects.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TeacherController],
  providers: [TeacherService, SubjectsService],
  exports: [TeacherService, SubjectsService],
})
export class TeachersModule {}
