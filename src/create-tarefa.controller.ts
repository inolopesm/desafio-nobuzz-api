import { Body, Controller, Post } from "@nestjs/common";
import { CreateTarefaService } from "./create-tarefa.service";
import { CreateTarefaDto } from "./create-tarefa.dto";

@Controller()
export class CreateTarefaController {
  constructor(private readonly createTarefaService: CreateTarefaService) {}

  @Post("v1/api/tarefas")
  async create(@Body() createTarefaDto: CreateTarefaDto) {
    return await this.createTarefaService.create({
      titulo: createTarefaDto.titulo,
      descricao: createTarefaDto.descricao,
    });
  }
}
