import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';

@Injectable()
export class SessoesService {
  constructor(private prisma: PrismaService) { }
  async create(createSessoeDto: CreateSessoeDto) {
    const { salaId, filmeId, inicioExibicao, ...outrosDados } = createSessoeDto;

    if (!salaId) throw new BadRequestException('É obrigatório informar o ID da sala.');
    if (!filmeId) throw new BadRequestException('É obrigatório informar o ID do filme.');

  
    const dataInicio = new Date(inicioExibicao);

    await this.validarSobreposicao(salaId, dataInicio, filmeId);

    return this.prisma.sessao.create({
      data: {
        ...outrosDados,
        inicioExibicao: dataInicio, // Passamos a data convertida
        sala: {
          connect: { id: salaId }
        },
        filme: {
          connect: { id: filmeId }
        }
      }
    });
  }



  async findAll() {

    return this.prisma.sessao.findMany({
      include: {
        filme: true, sala: true
      }
    })
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findFirst({
      where: { id },
      include: {
        filme: true,
        sala: true,
      }
    })

    if (!sessao) {
      throw new NotFoundException("Sessão não encontrada!")

    }

    return sessao;
  }

  async update(id: number, updateSessoeDto: UpdateSessoeDto) {
    const { salaId, filmeId, inicioExibicao, ...outrosDados } = updateSessoeDto;

    // 1. Verificar se a sessão existe antes de tudo
    const sessaoAtual = await this.prisma.sessao.findUnique({
      where: { id },
    });

    if (!sessaoAtual) {
      throw new NotFoundException(`Sessão não encontrada!`);
    }

    // 2. Preparar dados para validação de conflito
    // Se o DTO não trouxer nova sala ou data, usamos as que já estão no banco
    const novaData = inicioExibicao ? new Date(inicioExibicao) : sessaoAtual.inicioExibicao;
    const novaSalaId = salaId || sessaoAtual.salaId;
    const novoFilmeId = updateSessoeDto.filmeId || sessaoAtual.filmeId;

    if(novaSalaId) {
    await this.validarSobreposicao(novaSalaId, novaData, novoFilmeId, id);
    }

    // 4. Executar o update
    return this.prisma.sessao.update({
      where: { id },
      data: {
        ...outrosDados,
        ...(inicioExibicao && { inicioExibicao: novaData }),
        ...(salaId && {
          sala: { connect: { id: salaId } }
        }),
        ...(filmeId && {
          filme: { connect: { id: filmeId } }
        }),
      },
      include: {
        sala: true,
        filme: true
      }
    });
  }
  /*
na remoção da sessão, verifica se a sessão existe e também verifica se tem ingresso vendido para essa sessão,
se houver ingresso vendido, ele dá erro. 
se não, ele prossegue com a exclusão da sessão, sendo o filme e a sala, entidades independentes. 
  */

  async remove(id: number) {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: { _count: { select: { ingressos: true } } }
    });

    if (!sessao) {
      throw new NotFoundException(`Sessão não encontrada!`);
    }

    // 2. Regra de Negócio: Não deletar sessão com ingressos vendidos
    if (sessao._count.ingressos > 0) {
      throw new BadRequestException(
        'Não é possível remover uma sessão que já possui ingressos vendidos. Cancele os ingressos primeiro.'
      );
    }

    // 3. Deletar (Isso NÃO afetará o Filme nem a Sala)
    return this.prisma.sessao.delete({
      where: { id }
    });
  }

  private async validarSobreposicao(salaId: number, inicio: Date, filmeId: number, sessaoIdIgnore?: number) {
    // 1. Busca o filme que queremos agendar agora
    const filmeNovo = await this.prisma.filme.findUnique({ where: { id: filmeId } });
    if (!filmeNovo) throw new NotFoundException('Filme não encontrado');
  
    const duracaoNovaMs = filmeNovo.duracao * 60000;
    const inicioNovoMs = inicio.getTime();
    const fimNovoMs = inicioNovoMs + duracaoNovaMs;
  
    // 2. Busca TODAS as sessões daquela sala (simplificando o filtro para evitar erro de fuso)
    const sessoesExistentes = await this.prisma.sessao.findMany({
      where: { 
        salaId: salaId,
        id: { not: sessaoIdIgnore } 
      },
      include: { filme: true }
    });
  
    // 3. Loop de verificação manual (mais seguro que Query complexa)
    for (const sessao of sessoesExistentes) {
      const inicioExistenteMs = sessao.inicioExibicao.getTime();
      const fimExistenteMs = inicioExistenteMs + (sessao.filme.duracao * 60000);
  
      // Lógica de Sobreposição: 
      // Uma sessão conflita se começa antes da outra terminar E termina depois da outra começar
      const conflito = inicioNovoMs < fimExistenteMs && fimNovoMs > inicioExistenteMs;
  
      if (conflito) {
        const fimFormatado = new Date(fimExistenteMs).toLocaleTimeString('pt-BR', { timeZone: 'UTC' });
        throw new BadRequestException(
          `Conflito de Horário! A sala está ocupada por "${sessao.filme.titulo}" até às ${fimFormatado} (UTC).`
        );
      }
    }
  }

}
