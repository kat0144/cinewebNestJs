import { IsOptional, ValidateNested, IsArray, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateLanchDto } from '../../lanches/dto/create-lanch.dto';
import { CreateIngressoDto } from '../../ingressos/dto/create-ingresso.dto';


export class CreatePedidoDto {

    @ApiProperty({
        description: 'Lista de ingressos a serem criados no pedido',
        type: [CreateIngressoDto]
    })
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => CreateIngressoDto) 
    ingressos: CreateIngressoDto[];



    @ApiProperty({
        description: 'Lista de lanches/combos opcionais',
        type: [CreateLanchDto],
        required: false
    })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateLanchDto)
    lanches?: CreateLanchDto[];
}
