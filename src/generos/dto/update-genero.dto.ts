import { PartialType, ApiProperty } from '@nestjs/swagger'; 
import { CreateGeneroDto } from './create-genero.dto';
import { IsOptional, IsArray, ValidateNested, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class FilmeIdDto {
    @ApiProperty({ example: 1, description: 'ID do filme' })
    @IsInt()
    @IsNotEmpty()
    id: number;
}

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {

    @ApiProperty({
        type: [FilmeIdDto],
        example: [{ id: 1 }, { id: 2 }],
        description: 'Lista de IDs dos filmes vinculados a este gênero',
        required: false 
    })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FilmeIdDto) 
    filmes?: FilmeIdDto[]; 
}