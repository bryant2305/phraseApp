import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Phrase Api')
    .setDescription('just good vibes and GOOD PHRASES')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Servir la carpeta de uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get<number>('PORT') || 0);
}
bootstrap().then(() => {
  Logger.log('Application is up and running 🚀');
});
