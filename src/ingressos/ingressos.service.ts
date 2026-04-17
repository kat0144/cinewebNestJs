import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressosService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.ingresso.findMany({
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
        pedido: true,
      },
    })
  }


  async findOne(id: number) {

    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },

      include: {
        sessao: {
          include: {filme: true, sala: true}
        },
      },
    });

    if (!ingresso) {
      throw new NotFoundException("Ingresso não encontrado!")

    }

    return ingresso;
  }

  async verificarDisponibilidade(sessaoId: number, qtdsolicitada: number) {
    const sessao = await this.prisma.sessao.findUnique ({
      where: {id: sessaoId},
      include: {
        sala: true,
        _count: { select: { ingressos: true } }
      },
    })

    if(!sessao) {
      throw new NotFoundException("Sessão não encontrada")

    }

    if (!sessao.sala) {
      throw new InternalServerErrorException("Esta sessão não possui uma sala vinculada.");
    }

    const disponibilidade = sessao.sala?.capacidade - sessao._count.ingressos;

    if(disponibilidade < qtdsolicitada ) {
      throw new BadRequestException ("Sessão lotada!")
    }
    return true;
  }

  async remove(id: number) {
    return this.prisma.ingresso.delete({ where: { id }}

    );
  }
  
}
