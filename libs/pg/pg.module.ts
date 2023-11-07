import { DynamicModule, FactoryProvider, Module } from "@nestjs/common";
import { PgProvider } from "./pg.provider";
import { PG_OPTIONS } from "./pg.constants";
import { PgOptions } from "./pg-options.interface";

export type PgModuleOptions = Pick<DynamicModule, "global"> &
  Omit<FactoryProvider<PgOptions>, "provide">;

@Module({})
export class PgModule {
  static registerAsync(options: PgModuleOptions): DynamicModule {
    const { global = false, ...pgOptions } = options;

    return {
      global,
      module: PgModule,
      providers: [PgProvider, { ...pgOptions, provide: PG_OPTIONS }],
      exports: [PgProvider],
    };
  }
}
