import { PartialType } from '@nestjs/swagger';
import { CreateFilmeDto } from './create-filme.dto';
import { IsOptional, IsArray} from 'class-validator'


export class UpdateFilmeDto extends PartialType(CreateFilmeDto) {
  @IsOptional()
  @IsArray()
  genero?: { id: number }[];

}
