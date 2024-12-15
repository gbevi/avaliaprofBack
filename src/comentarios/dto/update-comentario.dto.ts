import { IsString } from 'class-validator';
export class UpdateComentariosDto {
  avaliacaoId: string;
  @IsString({ message: ' usuário tem que ser uma string ' })
  conteudo: string;
}
