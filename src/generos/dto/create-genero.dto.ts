import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneroDto {

    @ApiProperty({
        example: 'Terror',
        description: 'Indica o gênero do filme'

    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    

}
