import { Injectable } from "@nestjs/common";
import { CreateTarefaRepository } from "./create-tarefa.repository";

export interface CreateTarefaServiceParams {
  titulo: string;
  descricao: string | undefined;
}

@Injectable()
export class CreateTarefaService {
  constructor(
    private readonly createTarefaRepository: CreateTarefaRepository
  ) {}

  async create(params: CreateTarefaServiceParams) {
    return await this.createTarefaRepository.create({
      titulo: params.titulo,
      descricao: params.descricao,
    });
  }
}
