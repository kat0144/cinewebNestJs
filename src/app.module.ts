import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GenerosModule } from './generos/generos.module';
import { FilmesModule } from './filmes/filmes.module';
import { SalasModule } from './salas/salas.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { IngressosModule } from './ingressos/ingressos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { LanchesModule } from './lanches/lanches.module';
import { PrecosModule } from './precos/precos.module';
import { CinemaModule } from './cinema/cinema.module';

@Module({
  imports: [PrismaModule, GenerosModule, FilmesModule, SalasModule, SessoesModule, IngressosModule, PedidosModule, LanchesModule, PrecosModule, CinemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
