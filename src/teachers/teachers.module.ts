import { Module } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { TeacherController } from './teachers.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeachersModule {}
