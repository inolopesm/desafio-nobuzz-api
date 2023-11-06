import { IsNotEmpty, IsString, MaxLength, ValidateIf } from "class-validator";

export class CreateTarefaDto {
  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @MaxLength(2 ** 16 - 1)
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  descricao!: string | undefined;
}
