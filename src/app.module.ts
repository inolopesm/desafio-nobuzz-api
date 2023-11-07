import * as process from "node:process";
import { Module } from "@nestjs/common";
import { PgModule } from "libs/pg";
import { SessoesModule } from "./sessoes/sessoes.module";
import { TarefasModule } from "./tarefas/tarefas.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { AutenticacoesModule } from "./autenticacoes/autenticacoes.module";

const { POSTGRES_URL, SECRET } = process.env;

if (POSTGRES_URL === undefined) {
  throw new Error("POSTGRES_URL is a required field");
}

if (SECRET === undefined) {
  throw new Error("SECRET is a required field");
}

@Module({
  imports: [
    PgModule.register({ global: true, url: POSTGRES_URL }),
    TarefasModule,
    UsuariosModule,
    SessoesModule.register({ secret: SECRET }),
    AutenticacoesModule.register({ global: true, secret: SECRET }),
  ],
})
export class AppModule {}
