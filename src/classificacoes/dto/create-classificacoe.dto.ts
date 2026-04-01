import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateClassificacoeDto {
    @ApiProperty({
        example: 'Livre',
        description: 'Indica o classificação possiveis dos filmes'

    })
    @IsString()
    @IsNotEmpty()
    nome: string;


}
