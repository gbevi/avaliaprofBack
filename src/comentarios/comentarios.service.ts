import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateComentariosDto } from './dto/create-comentario.dto';
import { UpdateComentariosDto } from './dto/update-comentario.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComentariosService {
    constructor(
        private readonly prisma: DatabaseService
    ){}

    async create(createComentariosDto: Prisma.ComentariosCreateInput) {
      return this.prisma.comentarios.create({data: createComentariosDto});
    }


    async findAll() {
        return await this.prisma.comentarios.findMany();   
    }

    async findComentarios(id: string) { 
        return await this.prisma.comentarios.findUnique({ 
            where: {id:id}
        })
    }

    async deleteComentarios(id: string) {
        return await this.prisma.comentarios.delete({
            where: {id:id}
        })
    }

    async update(id: string, updateComentariosDto: Prisma.ComentariosUpdateInput) {
        return await this.prisma.comentarios.update({
            where: {id:id},
            data: updateComentariosDto,
            })
            
    }
}