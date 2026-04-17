import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, IsDate, ValidateNested, IsInt, IsEnum} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Classificacao } from '../../generated/prisma/enums'; 

class GeneroIdDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;
}

export class CreateFilmeDto {
    @ApiProperty({
        example: 'Como Treinar seu Dragão',
        description: 'Nome do filme'

    })
    @IsString()
    @IsNotEmpty()
    titulo: string;


    @ApiProperty({
        example: '',
        description: 'Relato breve do filme'

    })
    @IsString()
    @IsNotEmpty()
    sinopse: string;

    @ApiProperty({
        example: '180',
        description: 'Duração do tempo do filme'

    })
    @IsNumber()
    @IsNotEmpty()
    duracao: number;

    @ApiProperty({
        example: '2026-03-12T22:00:00Z',
        description: 'Data da Primeira Exibição'

    })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dataInicioExibicao: Date;

    @ApiProperty({
        example: '2026-03-31T22:00:00Z',
        description: 'Data da Última Exibição'

    })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dataFinalExibicao: Date;


    @ApiProperty({
        example: 'John Powell, ...',
        description: 'Atores e Atrizes que participam do filme'

    })

    @IsString()
    @IsOptional()
    elenco?: string;


    @ApiProperty({ enum: Classificacao, example: 'LIVRE' })
    @IsEnum(Classificacao)
    classificacaoEtaria: Classificacao;

    @ApiProperty({ 
        type: [GeneroIdDto], 
        example: [{ id: 1 }, { id: 2 }],
        description: 'Lista de IDs dos gêneros do filme' 
    })
    @IsArray()
    @IsOptional() 
    @ValidateNested({ each: true })
    @Type(() => GeneroIdDto)
    genero: GeneroIdDto[];


}
