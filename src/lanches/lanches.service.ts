import { Injectable } from '@nestjs/common';
import { CreateLanchDto } from './dto/create-lanch.dto';
import { UpdateLanchDto } from './dto/update-lanch.dto';

@Injectable()
export class LanchesService {
  create(createLanchDto: CreateLanchDto) {
    return 'This action adds a new lanch';
  }

  findAll() {
    return `This action returns all lanches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lanch`;
  }

  update(id: number, updateLanchDto: UpdateLanchDto) {
    return `This action updates a #${id} lanch`;
  }

  remove(id: number) {
    return `This action removes a #${id} lanch`;
  }
}
