import { Injectable } from '@nestjs/common';
import { UpdatePrecoDto } from './dto/update-preco.dto';
import { PrismaService } from '../prisma/prisma.service';

/*
no CRUD de preço só deverá ser feito a atualização
porque só existe somente um preço base dos ingressos.
*/


@Injectable()
export class PrecosService {
  constructor(private prisma: PrismaService) { }

 async findOne(id: number) {
    return this.prisma.precoBase.findUnique({
      where: {id: 1}
    })
  }

 async update(id: number, updatePrecoDto: UpdatePrecoDto) {
   return this.prisma.precoBase.upsert({
    where: {id: 1},
    update: {
      valorInteira: updatePrecoDto.valorInteira,
      valorMeia: updatePrecoDto.valorMeia
    },

    create: {
      id: 1,
      valorInteira: updatePrecoDto.valorInteira,
      valorMeia: updatePrecoDto.valorMeia
    },
   });
  }
}
