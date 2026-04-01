import { Injectable } from '@nestjs/common';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';

@Injectable()
export class SessoesService {
  create(createSessoeDto: CreateSessoeDto) {
    return 'This action adds a new sessoe';
  }

  findAll() {
    return `This action returns all sessoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sessoe`;
  }

  update(id: number, updateSessoeDto: UpdateSessoeDto) {
    return `This action updates a #${id} sessoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessoe`;
  }
}
