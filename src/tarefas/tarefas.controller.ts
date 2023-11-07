import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTarefaDto } from "./dto/create-tarefa.dto";
import { PgProvider } from "src/pg/pg.provider";
import { Tarefa } from "./entities/tarefa.entity";

@Controller("v1/api/tarefas")
export class TarefasController {
  constructor(private readonly pg: PgProvider) {}

  @Get()
  async findAll() {
    const result = await this.pg.query(
      'SELECT * FROM "Tarefa" ORDER BY "dataCriacao" ASC'
    );

    return result.rows as Tarefa[];
  }

  @Post()
  async create(@Body() createTarefaDto: CreateTarefaDto) {
    const result = createTarefaDto.descricao
      ? await this.pg.query(
          'INSERT INTO "Tarefa" ("titulo", "descricao") VALUES ($1, $2) RETURNING *',
          [createTarefaDto.titulo, createTarefaDto.descricao]
        )
      : await this.pg.query(
          'INSERT INTO "Tarefa" ("titulo") VALUES ($1) RETURNING *',
          [createTarefaDto.titulo]
        );

    return result.rows[0] as Tarefa;
  }
}
