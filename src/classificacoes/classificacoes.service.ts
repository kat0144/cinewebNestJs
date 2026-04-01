import { Injectable } from '@nestjs/common';
import { CreateClassificacoeDto } from './dto/create-classificacoe.dto';
import { UpdateClassificacoeDto } from './dto/update-classificacoe.dto';

@Injectable()
export class ClassificacoesService {
  create(createClassificacoeDto: CreateClassificacoeDto) {
    return 'This action adds a new classificacoe';
  }

  findAll() {
    return `This action returns all classificacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classificacoe`;
  }

  update(id: number, updateClassificacoeDto: UpdateClassificacoeDto) {
    return `This action updates a #${id} classificacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} classificacoe`;
  }
}
