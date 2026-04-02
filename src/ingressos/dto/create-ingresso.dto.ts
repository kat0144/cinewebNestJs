import { IsNotEmpty, IsNumber, IsEnum, IsInt} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { TipoIngresso } from '../../generated/prisma/enums'; 


export class CreateIngressoDto {

    @ApiProperty({ enum: TipoIngresso, example: 'INTEIRA' })
    @IsEnum(TipoIngresso)
    tipo: TipoIngresso;

    @ApiProperty({
        example: 'Id da Sessão',
        description: 'Id que corresponde a sessão'

    })

    @IsInt()
    @IsNotEmpty() 
    sessaoId: number;

}
