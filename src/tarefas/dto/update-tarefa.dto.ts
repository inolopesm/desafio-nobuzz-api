import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateTarefaDto {
  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @MaxLength(2 ** 16 - 1)
  @IsString()
  descricao!: string;

  @IsBoolean()
  concluido!: boolean;
}
