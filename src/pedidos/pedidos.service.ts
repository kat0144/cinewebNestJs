import { Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IngressosService } from '../ingressos/ingressos.service';
import { TipoIngresso } from 'src/generated/prisma/enums';


@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService,
    private readonly ingressosService: IngressosService,
  ) { }

  async create(createPedidoDto: CreatePedidoDto) {
    const { sessaoId, qtdInteira, qtdMeia, lanches } = createPedidoDto;
    
    const totalSolicitado = (qtdInteira || 0) + (qtdMeia || 0);
    if (totalSolicitado > 0) {
      await this.ingressosService.verificarDisponibilidade(sessaoId, totalSolicitado);
    }
  
    const precos = await this.prisma.precoBase.findUnique({ where: { id: 1 } });
    if (!precos) {
      throw new InternalServerErrorException('Preço base não configurado.');
    }
  
    let valorTotalPedido = 
      (qtdInteira || 0) * Number(precos.valorInteira) + 
      (qtdMeia || 0) * Number(precos.valorMeia);

    if (lanches && lanches.length > 0) {
      const lanchesEncontrados = await this.prisma.lancheCombo.findMany({
        where: { id: { in: lanches } }
      });
    
      lanchesEncontrados.forEach(lanche => {
        valorTotalPedido += Number(lanche.preco);
      });
    }
  
    // 4. Transação 
    return this.prisma.$transaction(async (tx) => {
      return tx.pedido.create({
        data: {
          qtdInteira,
          qtdMeia,
          valorTotal: valorTotalPedido, 
          ingressos: {
            create: [
              ...Array(qtdInteira || 0).fill({}).map(() => ({
                tipo: 'INTEIRA' as TipoIngresso,
                valorPago: precos.valorInteira,
                sessao: {
                  connect: { id: sessaoId }
                }
              })),
              ...Array(qtdMeia || 0).fill({}).map(() => ({
                tipo: 'MEIA' as TipoIngresso,
                valorPago: precos.valorMeia,
                sessao: {
                  connect: { id: sessaoId }
                }
              })),
            ],
          },
          // Conexão com lanches (IDs vindos do DTO)
          ...(lanches && {
            lanches: {
              connect: lanches.map((id) => ({ id }))
            }
          }),
        }, // Fim do objeto 'data'
        include: { // O 'include' fica aqui, dentro do create mas fora do data
          ingressos: true,
          lanches: true,
        },
      });
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        ingressos: {
          include: {
            sessao: {
              include: { filme: true, sala: true }
            }
          }
        },
        lanches: true
      }
    });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        ingressos: {
          include: {
            sessao: {
              include: { filme: true, sala: true }
            }
          }
        },
        lanches: true
      }
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido não encontrado!`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { lanches, sessaoId, ...dadosParaAtualizar } = updatePedidoDto;

    const pedidoExistente = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedidoExistente) {
      throw new NotFoundException(`Pedido #${id} não encontrado.`);
    }
  
    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...dadosParaAtualizar,
        ...(lanches && {
          lanches: {
            set: lanches.map(id => ({ id }))
          }
        })
      },
      include: {
        ingressos: true,
        lanches: true
      }
    });
  }

  async remove(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    
    if (!pedido) {
      throw new NotFoundException(`Pedido #${id} não encontrado.`);
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.ingresso.deleteMany({
        where: { pedidoId: id }
      });

      return tx.pedido.delete({
        where: { id }
      });
    });
  }
}
