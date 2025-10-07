import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora propriedades extras
      forbidNonWhitelisted: true, // lança erro se propriedades não permitidas forem enviadas
      transform: true, // converte tipos automaticamente (string → number, etc)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

    const config = new DocumentBuilder()
    .setTitle('Awesome Works API')
    .setDescription('API documentation for the Awesome Works backend project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
