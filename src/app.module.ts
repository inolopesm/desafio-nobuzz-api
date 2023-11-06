import { Module } from "@nestjs/common";
import { PgProvider } from "./pg.provider";
import { CreateTarefaRepository } from "./create-tarefa.repository";
import { CreateTarefaService } from "./create-tarefa.service";
import { CreateTarefaController } from "./create-tarefa.controller";

@Module({
  controllers: [CreateTarefaController],
  providers: [
    {
      provide: PgProvider,
      useFactory: () => {
        const { POSTGRES_URL } = process.env;

        if (POSTGRES_URL === undefined) {
          throw new Error("POSTGRES_URL is a required field");
        }

        return new PgProvider(POSTGRES_URL);
      },
    },
    CreateTarefaRepository,
    CreateTarefaService,
  ],
})
export class AppModule {}
