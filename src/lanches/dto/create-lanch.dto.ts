import { IsString, IsNotEmpty, IsInt, IsNumber, IsPositive } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanchDto {
    @ApiProperty({ example: 'Combo Mega Pipoca', description: 'Nome do combo' })
    @IsString()
    @IsNotEmpty()
    nome: string;
  
    @ApiProperty({ example: '1 Pipoca G, 2 Refris 500ml', description: 'O que vem no combo' })
    @IsString()
    @IsNotEmpty()
    descricao: string;
  
    @ApiProperty({ example: 45.90, description: 'Preço de venda' })
    @IsNumber()
    @IsPositive()
    preco: number;
  
    @ApiProperty({ example: 3, description: 'Total de itens físicos no combo' })
    @IsInt()
    @IsPositive()
    qtdItens: number;
    
}
