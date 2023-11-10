import { IsBoolean } from "class-validator";

export class ConclusaoTarefaDto {
  @IsBoolean()
  concluido!: boolean;
}
