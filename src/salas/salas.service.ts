import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) { }
   async create(createSalaDto: CreateSalaDto) {
    const salaExiste = await this.prisma.sala.findFirst({ 
      where:  { identificacao: createSalaDto.identificacao }
    });

    if (salaExiste) {
      throw new ConflictException("Já existe essa sala!")
    }
    return this.prisma.sala.create({
      data: createSalaDto
    });
  }

   async findAll() {
    return this.prisma.sala.findMany({
      include: { sessoes: true }
    })
  }

   async findOne(id: number) {
      const sala = await this.prisma.sala.findUnique({
        where: { id },
      })
  
      if (!sala) {
        throw new NotFoundException("Sala não encontrada!")
  
      }
  
      return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    try {
      return await this.prisma.sala.update({
        where: { id },
        data: updateSalaDto,
        include: {
          sessoes: true,
        },
      });
    }

    catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException("Sala não encontrada!");
      }
      throw error;
    }

  }

  /*
  na remoção da sala, verifica-se se existe sessõed vinculadas a ela, 
  se existir, seta a sala das sessões como NULL porque a sala será
  deletada.
  */

  async remove(id: number) {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
      include: { sessoes: true }
    });

    if (!sala) {
      throw new NotFoundException(`Sala não encontrada!`);
    }

    if (sala.sessoes.length > 0 ) {
      await this.prisma.sessao.updateMany({
        where: { salaId: id},
        data: { salaId: null }
      });
    }
    
    return this.prisma.sala.delete({
      where: { id }
    });
  }
}
