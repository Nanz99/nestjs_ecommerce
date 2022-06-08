import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('XSTORE')
    .setDescription('The Xstore API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  // await app.useGlobalGuards(new RolesGuard());
  await app.listen(process.env.PORT || 3000, () =>
    console.log(`http://localhost:${process.env.PORT}`),
  );
}
bootstrap();
