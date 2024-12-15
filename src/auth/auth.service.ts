import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/Create-user.dto';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  login(user: CreateUserDto): UserToken {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      id : user.id,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Invalid email or password');
  }
  getUserIdFromToken(token: string): string {
    const decodedToken = this.jwtService.decode(token) as UserPayload; // Decodifica o token
    return decodedToken.sub; // Retorna o ID do usuário (sub)
  }
}

