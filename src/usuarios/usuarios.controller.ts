import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import * as argon2 from "argon2";
import { PgProvider } from "libs/pg";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UsuarioDto } from "./dto/usuario.dto";
import { Usuario } from "./entities/usuario.entity";

@Controller("v1/api/usuarios")
export class UsuariosController {
  constructor(private readonly pg: PgProvider) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const selectResult = await this.pg.query(
      'SELECT COUNT(*) FROM "Usuario" WHERE "email" = $1',
      [createUsuarioDto.email]
    );

    const count = Number.parseInt(selectResult.rows[0].count, 10);

    if (count === 1) {
      throw new BadRequestException("E-mail in use");
    }

    // Minimum secure configuration
    // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

    const senhaHash = await argon2.hash(createUsuarioDto.senha, {
      timeCost: 2,
      memoryCost: 19 * 1024,
      parallelism: 1,
      type: argon2.argon2id,
    });

    const insertResult = await this.pg.query(
      'INSERT INTO "Usuario" ("email", "senha") VALUES ($1, $2) RETURNING *',
      [createUsuarioDto.email, senhaHash]
    );

    const usuario = insertResult.rows[0] as Usuario;

    const usuarioDto: UsuarioDto = {
      id: usuario.id,
      email: usuario.email,
      dataCriacao: usuario.dataCriacao,
      dataAtualizacao: usuario.dataAtualizacao,
    };

    return usuarioDto;
  }
}
