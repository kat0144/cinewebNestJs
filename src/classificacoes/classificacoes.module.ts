import { Module } from '@nestjs/common';
import { ClassificacoesService } from './classificacoes.service';
import { ClassificacoesController } from './classificacoes.controller';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [ClassificacoesController],
  providers: [ClassificacoesService],
})
export class ClassificacoesModule {}
