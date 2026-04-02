import { Injectable } from '@nestjs/common';
import { CreatePrecoDto } from './dto/create-preco.dto';
import { UpdatePrecoDto } from './dto/update-preco.dto';

@Injectable()
export class PrecosService {
  create(createPrecoDto: CreatePrecoDto) {
    return 'This action adds a new preco';
  }

  findAll() {
    return `This action returns all precos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preco`;
  }

  update(id: number, updatePrecoDto: UpdatePrecoDto) {
    return `This action updates a #${id} preco`;
  }

  remove(id: number) {
    return `This action removes a #${id} preco`;
  }
}
