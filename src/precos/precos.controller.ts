import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrecosService } from './precos.service';
import { CreatePrecoDto } from './dto/create-preco.dto';
import { UpdatePrecoDto } from './dto/update-preco.dto';

@Controller('precos')
export class PrecosController {
  constructor(private readonly precosService: PrecosService) {}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.precosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrecoDto: UpdatePrecoDto) {
    return this.precosService.update(+id, updatePrecoDto);
  }
}
