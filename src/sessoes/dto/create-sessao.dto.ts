import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSessaoDto {
  @MaxLength(254)
  @IsNotEmpty()
  @IsString()
  email!: string;

  @MaxLength(64)
  @IsNotEmpty()
  @IsString()
  senha!: string;
}
