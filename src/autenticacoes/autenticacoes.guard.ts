import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";

import * as jwt from "libs/jsonwebtoken";
import { AUTENTICACOES_OPTIONS } from "./autenticacoes.constants";
import { AutenticacoesOptions } from "./autenticacoes-options.interface";
import { PayloadDto } from "../sessoes/dto/payload.dto";

@Injectable()
export class AutenticacoesGuard implements CanActivate {
  private readonly secret: string;

  constructor(
    @Inject(AUTENTICACOES_OPTIONS) autenticacoesOptions: AutenticacoesOptions
  ) {
    this.secret = autenticacoesOptions.secret;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization as string | undefined;
    if (!authorization) return false;
    if (!authorization.startsWith("Bearer ")) return false;
    const strings = authorization.split(" ", 2) as [string, string | undefined];
    const [, token] = strings;
    if (!token) return false;
    const error = jwt.verify<PayloadDto>(token, this.secret);
    if (error instanceof Error) return false;
    return true;
  }
}
