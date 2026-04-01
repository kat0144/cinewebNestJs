import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassificacoesService } from './classificacoes.service';
import { CreateClassificacoeDto } from './dto/create-classificacoe.dto';
import { UpdateClassificacoeDto } from './dto/update-classificacoe.dto';

@Controller('classificacoes')
export class ClassificacoesController {
  constructor(private readonly classificacoesService: ClassificacoesService) {}

  @Post()
  create(@Body() createClassificacoeDto: CreateClassificacoeDto) {
    return this.classificacoesService.create(createClassificacoeDto);
  }

  @Get()
  findAll() {
    return this.classificacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classificacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassificacoeDto: UpdateClassificacoeDto) {
    return this.classificacoesService.update(+id, updateClassificacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classificacoesService.remove(+id);
  }
}
