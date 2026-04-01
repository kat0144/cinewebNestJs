import { PartialType } from '@nestjs/swagger';
import { CreateLanchDto } from './create-lanch.dto';

export class UpdateLanchDto extends PartialType(CreateLanchDto) {}
