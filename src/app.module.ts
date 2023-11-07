import { Module } from "@nestjs/common";
import { PgModule } from "./pg/pg.module";
import { TarefasModule } from "./tarefas/tarefas.module";

@Module({
  imports: [{ module: PgModule, global: true }, TarefasModule],
})
export class AppModule {}
