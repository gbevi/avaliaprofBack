import { IsInt, IsString } from "class-validator";
export class UpdateComentariosDto {
    @IsInt({message: 'id da avaliacao deve ser um número inteiro'}) 
    avaliacaoId: string;
    @IsString({message: ' usuário tem que ser uma string '})
    conteudo: string;
       
}