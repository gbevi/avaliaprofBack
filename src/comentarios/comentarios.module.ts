import { DatabaseService } from 'src/database/database.service';
import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';

@Module({
  controllers: [ComentariosController],
  providers: [ComentariosService, DatabaseService],
})
export class ComentariosModule {}
