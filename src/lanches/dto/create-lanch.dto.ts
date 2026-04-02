import { IsString, IsNotEmpty, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanchDto {
    @ApiProperty({
        example: 'Sanduíche',
        description: 'Indica o nome do produto'

    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        example: 'Pão, picles, hambúrguer',
        description: 'Indica a descrição do produto'

    })
    @IsString()
    @IsNotEmpty()
    descricao: string;


    @ApiProperty({
        example: 3,
        description: 'Indica a quantidade do produto'

    })
    @IsInt()
    @IsNotEmpty()
    qtdItens: number;
    
}
