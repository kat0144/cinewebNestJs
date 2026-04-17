import { IsString, IsNotEmpty, IsInt, IsPositive, IsArray, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateSessoeDto } from '../../sessoes/dto/create-sessoe.dto'

export class CreateSalaDto {

    @ApiProperty({
        example: ' Sala A1',
        description: 'Indica o nome da sala'

    })
    @IsString()
    @IsNotEmpty()
    identificacao: string;

    @ApiProperty({
        example: 34,
        description: 'Indica a capacidade total de pessoas na sala'

    })
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    capacidade: number;

}
