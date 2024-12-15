import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [EvaluateService],
  controllers: [EvaluateController],
  exports: [EvaluateService],
})
export class EvaluateModule {}
