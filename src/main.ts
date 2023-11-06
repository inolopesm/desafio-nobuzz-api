import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());
  const host = process.env.HOST ?? "0.0.0.0";
  const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port, host);
}

bootstrap();
