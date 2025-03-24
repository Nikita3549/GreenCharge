import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.setGlobalPrefix('v1')

	app.useGlobalPipes(new ValidationPipe( { whitelist: true }))
	await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
