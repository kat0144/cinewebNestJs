import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { IngressosModule } from 'src/ingressos/ingressos.module';


@Module({
  imports:[PrismaModule,
    IngressosModule
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
