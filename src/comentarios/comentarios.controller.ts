import {
  Controller,
  Get,
  Post,
  Param,
  ValidationPipe,
  Body,
  ParseIntPipe,
  Delete,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentariosDto } from './dto/create-comentario.dto';
import { UpdateComentariosDto } from './dto/update-comentario.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/models/UserPayload';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  async create(
    @Body() createComentariosDto: CreateComentariosDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    console.log(currentUser);
    console.log(createComentariosDto.userId);
    if (createComentariosDto.userId !== currentUser.id) {

      throw new UnauthorizedException(
        'Só é possível criar comentarios para si mesmo',
      );
    }
    return this.comentariosService.create(createComentariosDto);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return await this.comentariosService.findAll();
  }

  @Get(':id')
  async findComentarios(@Param('id', ParseIntPipe) id: string) {
    return await this.comentariosService.findComentarios(id);
  }
  @Delete(':id')
  async deleteComentarios(@Param('id', ParseIntPipe) id: string) {
    return await this.comentariosService.deleteComentarios(id);
  }
//Finalizar atualização (Patch) de comentários.
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) data: UpdateComentariosDto,
  ) {
    return await this.comentariosService.update(id, data);
  }
}
