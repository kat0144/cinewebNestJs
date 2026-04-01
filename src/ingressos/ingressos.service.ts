import { Injectable } from '@nestjs/common';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressosService {
  create(createIngressoDto: CreateIngressoDto) {
    return 'This action adds a new ingresso';
  }

  findAll() {
    return `This action returns all ingressos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingresso`;
  }

  update(id: number, updateIngressoDto: UpdateIngressoDto) {
    return `This action updates a #${id} ingresso`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingresso`;
  }
}
