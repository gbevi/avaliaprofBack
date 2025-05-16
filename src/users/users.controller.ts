import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { UpdateUserDto } from './dto/Update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@IsPublic()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @UploadedFile() file: Multer.File,
  ) {
    const photo = file ? file.buffer.toString('base64') : undefined;
    return this.usersService.create({ ...createUserDto, photo });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @UploadedFile() file: Multer.File,
  ) {
    const photo = file ? file.buffer.toString('base64') : undefined;
    return this.usersService.update(id, { ...updateUserDto, photo });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
