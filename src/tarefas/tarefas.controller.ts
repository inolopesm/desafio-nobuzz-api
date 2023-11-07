import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { CreateTarefaDto } from "./dto/create-tarefa.dto";
import { PgProvider } from "src/pg/pg.provider";
import { Tarefa } from "./entities/tarefa.entity";
import { UpdateTarefaDto } from "./dto/update-tarefa.dto";

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

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const result = await this.pg.query(
      'SELECT * FROM "Tarefa" WHERE "id" = $1',
      [id]
    );

    const [tarefa] = result.rows as Tarefa[];

    if (tarefa === undefined) {
      throw new BadRequestException("Tarefa not found");
    }

    return tarefa;
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

  @Put(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateTarefaDto: UpdateTarefaDto
  ) {
    const selectResult = await this.pg.query(
      'SELECT * FROM "Tarefa" WHERE "id" = $1',
      [id]
    );

    const [tarefa] = selectResult.rows as Tarefa[];

    if (tarefa === undefined) {
      throw new BadRequestException("Tarefa not found");
    }

    const updateResult = await this.pg.query(
      'UPDATE "Tarefa" SET "titulo" = $1, "descricao" = $2, "dataConclusao" = $3 WHERE "id" = $4 RETURNING *',
      [
        updateTarefaDto.titulo,
        updateTarefaDto.descricao,
        updateTarefaDto.concluido ? new Date().toISOString() : null,
        id,
      ]
    );

    return updateResult.rows[0] as Tarefa;
  }
}
