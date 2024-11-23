import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/Create-user.dto';

export interface AuthRequest extends Request {
  user: CreateUserDto;
}
