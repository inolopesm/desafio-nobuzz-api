import { Injectable } from "@nestjs/common";
import { PgProvider } from "./pg.provider";
import { Tarefa } from "./tarefa.entity";

export interface CreateTarefaRepositoryParams {
  titulo: string;
  descricao: string | undefined;
}

@Injectable()
export class CreateTarefaRepository implements CreateTarefaRepository {
  constructor(private readonly pg: PgProvider) {}

  async create(params: CreateTarefaRepositoryParams): Promise<Tarefa> {
    const result = params.descricao
      ? await this.pg.query(
          'INSERT INTO "Tarefa" ("titulo", "descricao") VALUES ($1, $2) RETURNING *',
          [params.titulo, params.descricao]
        )
      : await this.pg.query(
          'INSERT INTO "Tarefa" ("titulo") VALUES ($1) RETURNING *',
          [params.titulo]
        );

    return result.rows[0] as Tarefa;
  }
}
