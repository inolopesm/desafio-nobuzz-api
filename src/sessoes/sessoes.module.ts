import { DynamicModule, Module } from "@nestjs/common";
import { SessoesController } from "./sessoes.controller";
import { SessoesOptions } from "./sessoes-options.interface";
import { SESSOES_OPTIONS } from "./sessoes.constants";

export type SessoesModuleOptions = SessoesOptions;

@Module({})
export class SessoesModule {
  static register(options: SessoesModuleOptions): DynamicModule {
    const { ...sessoesOptions } = options;

    return {
      module: SessoesModule,
      controllers: [SessoesController],
      providers: [{ provide: SESSOES_OPTIONS, useValue: sessoesOptions }],
    };
  }
}
