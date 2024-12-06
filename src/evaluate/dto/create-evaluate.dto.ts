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
  teacher
  teacherId: string;
  id?: string;
  IdUser
  UserId
}