import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateLanchDto } from './dto/create-lanch.dto';
import { UpdateLanchDto } from './dto/update-lanch.dto';

@Injectable()
export class LanchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLanchDto: CreateLanchDto) {
    return this.prisma.lancheCombo.create({
      data: {
        nome: createLanchDto.nome,
        descricao: createLanchDto.descricao,
        preco: createLanchDto.preco,
        qtdItens: createLanchDto.qtdItens,
        // O campo 'total' eu removi do modelo pois ele 
        // costuma ser o valor acumulado no Pedido, não no cardápio.
      },
    });
  }
  findAll() {
    return this.prisma.lancheCombo.findMany({
      orderBy: { nome: 'asc' }, // Organiza o cardápio por ordem alfabética
    });
  }

  async findOne(id: number) {
    const lanche = await this.prisma.lancheCombo.findUnique({
      where: { id },
    });

    if (!lanche) {
      throw new NotFoundException(`Lanche com ID #${id} não encontrado.`);
    }

    return lanche;
  }

  async update(id: number, updateLanchDto: UpdateLanchDto) {
    // Primeiro verificamos se o lanche existe
    await this.findOne(id);

    return this.prisma.lancheCombo.update({
      where: { id },
      data: updateLanchDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.lancheCombo.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Não é possível remover um lanche que já está vinculado a pedidos realizados.');
    }
  }
}
