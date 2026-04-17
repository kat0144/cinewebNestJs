import { PartialType } from '@nestjs/swagger';
import { CreatePrecoDto } from './create-preco.dto';
import { IsNumber, IsPositive } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrecoDto extends PartialType(CreatePrecoDto) {

    @ApiProperty({ 
        example: 40.00, 
        description: 'Novo valor da inteira' 
    })

    @IsNumber()
    @IsPositive()
    valorInteira: number;

    
    @ApiProperty({ 
        example: 20.00, 
        description: 'Novo valor da meia' 
    })

    @IsNumber()
    @IsPositive()
    valorMeia: number;
}
