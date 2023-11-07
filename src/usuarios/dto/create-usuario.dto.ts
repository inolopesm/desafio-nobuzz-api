import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUsuarioDto {
  @IsEmail()
  @MaxLength(254)
  @IsString()
  email!: string;

  @Matches(/^[A-Za-z0-9!@#$%^&*]+$/)
  @MaxLength(64)
  @MinLength(8)
  @IsString()
  senha!: string;
}
