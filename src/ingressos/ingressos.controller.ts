import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngressosService } from './ingressos.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Controller('ingressos')
export class IngressosController {
  constructor(private readonly ingressosService: IngressosService) {}

  @Get()
  findAll() {
    return this.ingressosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingressosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingressosService.remove(+id);
  }
}
