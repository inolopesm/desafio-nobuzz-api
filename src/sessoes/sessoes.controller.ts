import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from "@nestjs/common";

import * as argon2 from "argon2";
import jwtSign from "libs/jsonwebtoken/sign";
import { PgProvider } from "../../libs/pg/pg.provider";
import { CreateSessaoDto } from "./dto/create-sessao.dto";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { SessionDto } from "./dto/session.dto";
import { PayloadDto } from "./dto/payload.dto";
import { SessoesOptions } from "./sessoes-options.interface";
import { SESSOES_OPTIONS } from "./sessoes.constants";

@Controller("v1/api/sessoes")
export class SessoesController {
  private readonly secret: string;

  constructor(
    private readonly pg: PgProvider,
    @Inject(SESSOES_OPTIONS) sessoesOptions: SessoesOptions
  ) {
    this.secret = sessoesOptions.secret;
  }

  @Post()
  async create(@Body() createSessaoDto: CreateSessaoDto) {
    const result = await this.pg.query(
      'SELECT * FROM "Usuario" WHERE "email" = $1',
      [createSessaoDto.email]
    );

    const [usuario] = result.rows as Usuario[];

    if (usuario === undefined) {
      throw new BadRequestException("Invalid credentials");
    }

    // Minimum secure configuration
    // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

    const match = await argon2.verify(usuario.senha, createSessaoDto.senha, {
      timeCost: 2,
      memoryCost: 19 * 1024,
      parallelism: 1,
      type: argon2.argon2id,
    });

    if (!match) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload: PayloadDto = { sub: usuario.id, email: usuario.email };
    const accessToken = jwtSign(payload, this.secret);
    const sessionDto: SessionDto = { accessToken };

    return sessionDto;
  }
}
