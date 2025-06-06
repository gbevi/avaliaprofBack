import { IsOptional, IsArray, IsString } from 'class-validator';

export class CreateTeacherDto {
  name: string;
  department: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjectIds?: string[];
}
