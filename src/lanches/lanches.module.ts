import { Module } from '@nestjs/common';
import { LanchesService } from './lanches.service';
import { LanchesController } from './lanches.controller';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports:[PrismaModule],
  controllers: [LanchesController],
  providers: [LanchesService],
})
export class LanchesModule {}
