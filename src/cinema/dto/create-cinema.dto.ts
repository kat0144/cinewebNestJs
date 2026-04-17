import { IsString, MinLength } from 'class-validator';

export class CreateCinemaDto {
  @IsString()
  @MinLength(3, { message: 'O nome do cinema deve ter pelo menos 3 caracteres.' })
  nome: string;

  @IsString()
  @MinLength(10, { message: 'O endereço deve ser detalhado.' })
  endereco: string;
}

