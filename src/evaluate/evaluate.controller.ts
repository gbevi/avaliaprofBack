import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { CreateEvaluateDto } from './dto/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/update-evaluate.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';



@Controller('evaluate')
export class EvaluateController {
    constructor(private readonly evaluateService: EvaluateService) {}

    @IsPublic()
    @Post()
    create(@Body() createEvaluateDto: CreateEvaluateDto){
        return this.evaluateService.create(createEvaluateDto);
    }

    @IsPublic()
    @Get()
    findAll() {
        return this.evaluateService.findAll();
    }
    
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateEvaluateDto: UpdateEvaluateDto) {
        return this.evaluateService.update(id, updateEvaluateDto);
    }
    @IsPublic()
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.evaluateService.remove(id);
    }
}

