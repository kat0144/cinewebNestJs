import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, IsDate, ValidateNested, IsInt} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CreateIngressoDto {
    @ApiProperty({
        example: 'Inteira ou Meia',
        description: 'Indica o tipo de ingresso'

    })
    @IsString()
    @IsNotEmpty()
    tipo: string;

    
}
