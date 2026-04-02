import { IsNotEmpty, IsInt, IsArray, ValidateNested, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateIngressoDto } from '../../ingressos/dto/create-ingresso.dto';



export class CreateSessoeDto {

    @ApiProperty({
        example: '2026-04-01T18:00:00Z', 
        description: 'Indica a data e hora de início da exibição no formato ISO (AAAA-MM-DDTHH:MM:SSZ)'
    })
    @IsDateString() 
    @IsNotEmpty()
    inicioExibicao: string; 



    @ApiProperty({
        example: 4,
        description: 'ID do filme'

    })


    @IsInt()
    @IsNotEmpty() 
    filmeId: number;


    @ApiProperty({
        example: 2,
        description: 'ID da sala'

    })


    @IsInt()
    @IsNotEmpty() 
    salaId: number;


    @ApiProperty({
        description: 'Lista de ingressos da sessão correspondente',
        type: [CreateIngressoDto]
    })
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => CreateIngressoDto) 
    ingressos: CreateIngressoDto[];




}
