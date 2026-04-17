import { IsOptional, ValidateNested, IsArray, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateLanchDto } from '../../lanches/dto/create-lanch.dto';
import { CreateIngressoDto } from '../../ingressos/dto/create-ingresso.dto';


export class CreatePedidoDto {
    @ApiProperty({
        description: 'Lista de lanches/combos opcionais',
    })
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    lanches?: number[];



    @ApiProperty({
        description: 'Quantidade de ingressos tipo Meia',
        example: 1
    })
    @IsInt()
    @Min(0)
    @IsOptional()
    qtdMeia?: number;



    @ApiProperty({
        description: 'Quantidade de ingressos tipo Inteira',
        example: 2
    })

    @IsInt()
    @Min(0)
    @IsOptional()
    qtdInteira?: number;

    @ApiProperty({
        description: 'ID da sessão',
        example: 2
    })
    @IsInt()
    @IsNotEmpty()
    sessaoId: number;

}
