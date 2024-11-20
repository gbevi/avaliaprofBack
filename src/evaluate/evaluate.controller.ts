import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';



@Controller('evaluate')
export class EvaluateController {
    constructor(private readonly evaluateService: EvaluateService) {}

    @Get()
    findAll() {
        return this.evaluateService.findAll();
    }
}

