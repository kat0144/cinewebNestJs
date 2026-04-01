import { PartialType } from '@nestjs/swagger';
import { CreateClassificacoeDto } from './create-classificacoe.dto';

export class UpdateClassificacoeDto extends PartialType(CreateClassificacoeDto) {}
