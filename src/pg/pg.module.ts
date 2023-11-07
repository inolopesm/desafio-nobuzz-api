import * as process from "node:process";
import { Module } from "@nestjs/common";
import { PgProvider } from "./pg.provider";

@Module({
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
  ],
  exports: [PgProvider],
})
export class PgModule {}
