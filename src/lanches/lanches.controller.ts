import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanchesService } from './lanches.service';
import { CreateLanchDto } from './dto/create-lanch.dto';
import { UpdateLanchDto } from './dto/update-lanch.dto';

@Controller('lanches')
export class LanchesController {
  constructor(private readonly lanchesService: LanchesService) {}

  @Post()
  create(@Body() createLanchDto: CreateLanchDto) {
    return this.lanchesService.create(createLanchDto);
  }

  @Get()
  findAll() {
    return this.lanchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lanchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanchDto: UpdateLanchDto) {
    return this.lanchesService.update(+id, updateLanchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lanchesService.remove(+id);
  }
}
