import { DynamicModule, Module } from "@nestjs/common";
import { PgProvider } from "./pg.provider";
import { PG_OPTIONS } from "./pg.constants";
import { PgOptions } from "./pg-options.interface";

export type PgModuleOptions = Pick<DynamicModule, "global"> & PgOptions;

@Module({})
export class PgModule {
  static register(options: PgModuleOptions): DynamicModule {
    const { global = false, ...pgOptions } = options;

    return {
      global,
      module: PgModule,
      providers: [PgProvider, { provide: PG_OPTIONS, useValue: pgOptions }],
      exports: [PgProvider],
    };
  }
}
