import { Module } from "@nestjs/common";
import { TarefasController } from "./tarefas.controller";

@Module({ controllers: [TarefasController] })
export class TarefasModule {}
