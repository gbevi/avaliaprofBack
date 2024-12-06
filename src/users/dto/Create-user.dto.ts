import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  curso: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  course


  id?: string;
}
