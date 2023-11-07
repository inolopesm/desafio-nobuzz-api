import { DynamicModule, FactoryProvider, Module } from "@nestjs/common";
import { SessoesController } from "./sessoes.controller";
import { SessoesOptions } from "./sessoes-options.interface";
import { SESSOES_OPTIONS } from "./sessoes.constants";

export type SessoesModuleOptions = Omit<
  FactoryProvider<SessoesOptions>,
  "provide"
>;

@Module({})
export class SessoesModule {
  static registerAsync(options: SessoesModuleOptions): DynamicModule {
    const { ...sessoesOptions } = options;

    return {
      module: SessoesModule,
      controllers: [SessoesController],
      providers: [{ ...sessoesOptions, provide: SESSOES_OPTIONS }],
    };
  }
}
