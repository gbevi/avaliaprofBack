import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EvaluateService],
  controllers: [EvaluateController],
  exports: [EvaluateService],
})
export class EvaluateModule {}
