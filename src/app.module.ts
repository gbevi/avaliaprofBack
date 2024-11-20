import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EvaluateModule } from './evaluate/evaluate.module';

@Module({
  imports: [DatabaseModule, EvaluateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
