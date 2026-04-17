import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  // Cria o registo do cinema
  async create(createCinemaDto: CreateCinemaDto) {
    return this.prisma.cinema.create({
      data: createCinemaDto,
    });
  }

  // Lista todos (ou o único cinema cadastrado)
  async findAll() {
    return this.prisma.cinema.findMany({
      include: {
        _count: {
          select: { salas: true, filmes: true, sessoes: true },
        },
      },
    });
  }

  // Busca por ID
  async findOne(id: number) {
    const cinema = await this.prisma.cinema.findUnique({
      where: { id },
      include: {
        salas: true,
        filmes: true,
      },
    });

    if (!cinema) {
      throw new NotFoundException(`Cinema com ID ${id} não encontrado.`);
    }

    return cinema;
  }

  // Atualiza os dados
  async update(id: number, updateCinemaDto: UpdateCinemaDto) {
    try {
      return await this.prisma.cinema.update({
        where: { id },
        data: updateCinemaDto,
      });
    } catch (error) {
      throw new NotFoundException(`Não foi possível atualizar o cinema ID ${id}.`);
    }
  }

  // Remove o cinema
  async remove(id: number) {
    try {
      return await this.prisma.cinema.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Erro ao remover o cinema ID ${id}.`);
    }
  }
}