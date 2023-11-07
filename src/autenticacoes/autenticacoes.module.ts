import { DynamicModule, Module } from "@nestjs/common";
import { AutenticacoesOptions } from "./autenticacoes-options.interface";
import { AUTENTICACOES_OPTIONS } from "./autenticacoes.constants";
import { AutenticacoesGuard } from "./autenticacoes.guard";

export type AutenticacoesModuleOptions = Pick<DynamicModule, "global"> &
  AutenticacoesOptions;

@Module({})
export class AutenticacoesModule {
  static register(options: AutenticacoesModuleOptions): DynamicModule {
    const { global = false, ...autenticacoesOptions } = options;

    return {
      global,
      module: AutenticacoesModule,
      exports: [AutenticacoesGuard, AUTENTICACOES_OPTIONS],
      providers: [
        AutenticacoesGuard,
        { provide: AUTENTICACOES_OPTIONS, useValue: autenticacoesOptions },
      ],
    };
  }
}
