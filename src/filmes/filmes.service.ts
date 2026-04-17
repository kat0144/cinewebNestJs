import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';


@Injectable()
export class FilmesService {
  constructor(private prisma: PrismaService) { }

  async create(createFilmeDto: CreateFilmeDto) {

    // verifica se existe um filme com o mesmo título, para não incluir repetido
    const filmeExistente = await this.prisma.filme.findFirst({
      where: { titulo: createFilmeDto.titulo },

    });

    if (filmeExistente) {
      throw new ConflictException("Já existe um filme com esse título!");
    }

    else {
      return await this.prisma.filme.create({
        data: {
          titulo: createFilmeDto.titulo,
          sinopse: createFilmeDto.sinopse,
          duracao: createFilmeDto.duracao,
          elenco: createFilmeDto.elenco,
          classificacaoEtaria: createFilmeDto.classificacaoEtaria,
          dataInicioExibicao: createFilmeDto.dataInicioExibicao,
          dataFinalExibicao: createFilmeDto.dataFinalExibicao,
      
          genero: {
            connect: createFilmeDto.genero
          }
        }
      });
    }
  }

  async findAll() {
    return await this.prisma.filme.findMany({
      include: {
        sessoes: true,
        genero: true,
      }
    });
  }


  async findOne(id: number) {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
      include: { genero: true, sessoes: { include: { sala: true } } },
    });

    if (!filme) {
      throw new NotFoundException("Filme não encontrado!")
    }

    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    const { genero, ...dadosRestantes } = updateFilmeDto;
    try {
      return this.prisma.filme.update({
        where: { id },
        data: {
          ...dadosRestantes,
          ...(genero && {
            genero: {
              set: genero,
            },
          }),
        },
        include: {
          genero: true,
          sessoes: true,
        },
      });
    }

    catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException("Filme não encontrado!");
      }
      throw error;
    }


  }

  async remove(id: number) {

    const filmeExistente = await this.prisma.filme.findFirst({
      where: { id },

    });

    if (!filmeExistente) {
      throw new ConflictException("Não é possível deletar esse filme, ele não existe!")
    }


    return this.prisma.filme.delete({ where: { id } });
  }
}
