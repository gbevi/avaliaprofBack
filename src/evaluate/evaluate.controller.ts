import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { CreateEvaluateDto } from './dto/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/update-evaluate.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthService } from 'src/auth/auth.service';
import { UserPayload } from 'src/auth/models/UserPayload';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';



@Controller('evaluate')
export class EvaluateController {
   constructor(
     private readonly evaluateService: EvaluateService,
     private readonly authService: AuthService,
   ) {}

    @Post()
    async create(@Body() createEvaluateDto: CreateEvaluateDto, @CurrentUser() currentUser: UserPayload) {
        console.log(currentUser);
        console.log(createEvaluateDto.UserId);
        console.log(currentUser.id);
        if(createEvaluateDto.UserId !== currentUser.id) {
            throw new Error('Unauthorized');
        }
        return this.evaluateService.create(createEvaluateDto);
      }

    @IsPublic()
    @Get()
    findAll() {
        return this.evaluateService.findAll();
    }

    @IsPublic()
    @Get('teacher/:id')
    findAllByTeacher(@Param('id') id: string) {
        return this.evaluateService.findByTeacher(id);
    }

    @IsPublic()
    @Get('user/:id')
    findAllByUser(@Param('id') id: string) {
        return this.evaluateService.findAllByUser(id);
    }

    @IsPublic()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.evaluateService.findOne(id);
    }
    
    @Patch(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateEvaluateDto: UpdateEvaluateDto, @CurrentUser() currentUser: UserPayload) {
        const existingEvaluation = await this.evaluateService.findOne(id);
        if (!existingEvaluation) {
            throw new Error(`Avaliação com ID ${id} não encontrada`);
          }
        if (existingEvaluation.UserId !== currentUser.id) {
            throw new Error('Você não tem permissão para atualizar esta avaliação');
        }
        return this.evaluateService.update(id, updateEvaluateDto);
    }
    
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() currentUser: UserPayload) {
        console.log(id);
        const existingEvaluation = await this.evaluateService.findOne(id);
        console.log(existingEvaluation);
        if (!existingEvaluation) {
            throw new Error(`Avaliação com ID ${id} não encontrada`);
          }
        if (existingEvaluation.UserId !== currentUser.id) {
            throw new Error('Você não tem permissão para atualizar esta avaliação');
        }
        return this.evaluateService.remove(id);
    }
}