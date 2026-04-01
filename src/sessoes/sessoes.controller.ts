import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessoesService } from './sessoes.service';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';

@Controller('sessoes')
export class SessoesController {
  constructor(private readonly sessoesService: SessoesService) {}

  @Post()
  create(@Body() createSessoeDto: CreateSessoeDto) {
    return this.sessoesService.create(createSessoeDto);
  }

  @Get()
  findAll() {
    return this.sessoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessoeDto: UpdateSessoeDto) {
    return this.sessoesService.update(+id, updateSessoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessoesService.remove(+id);
  }
}
