import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEvaluateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  subjectId : string;
  
  
  @IsString()
  @IsNotEmpty()
  UserId: string;
}