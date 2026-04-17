import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Injectable()
export class GenerosService {
  constructor(private prisma: PrismaService) { }

  async create(createGeneroDto: CreateGeneroDto) {

    const generoExistente = await this.prisma.genero.findFirst({
      where: { nome: createGeneroDto.nome }
    });

    if (generoExistente) {
      throw new ConflictException("Já existe um gênero com esse nome.")

    }

    return this.prisma.genero.create({
      data: createGeneroDto
    });

  }

  async findAll() {
    return this.prisma.genero.findMany();
  }

  async findOne(id: number) {
    const genero = await this.prisma.genero.findUnique({
      where: { id },
    })

    if (!genero) {
      throw new NotFoundException("Gênero não encontrado!")

    }

    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto) {
    const { filmes, ...dadosRestantes } = updateGeneroDto;

    try {
      return await this.prisma.genero.update({
        where: { id },
        data: {
          ...dadosRestantes,

          ...(filmes && {
            filmes: {
              set: filmes.map((f) => ({ id: f.id })),
            },
          }),
        },
        include: {
          filmes: true,
        },
      });
    }

    catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Gênero não encontrado!`);
      }
      throw error;
    }
  }

  async remove(id: number) {

    const generoExistente = await this.prisma.genero.findFirst({
      where: { id },

    });

    if (!generoExistente) {
      throw new ConflictException("Não é possível deletar esse gênero, ele não existe!")
    }


    return this.prisma.genero.delete({ where: { id } });
  }

}

