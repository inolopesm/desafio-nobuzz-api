import { Module } from "@nestjs/common";
import { PgModule } from "./pg/pg.module";
import { TarefasModule } from "./tarefas/tarefas.module";
import { UsuariosModule } from "./usuarios/usuarios.module";

@Module({
  imports: [{ module: PgModule, global: true }, TarefasModule, UsuariosModule],
})
export class AppModule {}
