import { IsString, IsNotEmpty, IsInt } from "class-validator";
export class CreateComentariosDto {
    @IsNotEmpty({message: ' o parametro nao pode ser vazio '})
    userId: string;

    @IsNotEmpty({message: 'nao pode estar vazio'})
    avaliacaoId: string;

    @IsString({message: ' tem que ser texto '})
    @IsNotEmpty({message: ' o parametro nao pode ser vazio '})
    conteudo: string;
}