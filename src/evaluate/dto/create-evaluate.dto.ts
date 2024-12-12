import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEvaluateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;
  
  @IsString()
  @IsNotEmpty()
  UserId: string;
}