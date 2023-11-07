import * as process from "node:process";
import { Module } from "@nestjs/common";
import { PgModule } from "libs/pg";
import { SessoesModule } from "./sessoes/sessoes.module";
import { TarefasModule } from "./tarefas/tarefas.module";
import { UsuariosModule } from "./usuarios/usuarios.module";

@Module({
  imports: [
    PgModule.registerAsync({
      global: true,
      useFactory: () => {
        const { POSTGRES_URL } = process.env;

        if (POSTGRES_URL === undefined) {
          throw new Error("POSTGRES_URL is a required field");
        }

        return { url: POSTGRES_URL };
      },
    }),
    TarefasModule,
    UsuariosModule,
    SessoesModule.registerAsync({
      useFactory: () => {
        const { SECRET } = process.env;

        if (SECRET === undefined) {
          throw new Error("SECRET is a required field");
        }

        return { secret: SECRET };
      },
    }),
  ],
})
export class AppModule {}
