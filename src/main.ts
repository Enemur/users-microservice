import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const grpcUser = {
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_USER_SERVICE || '127.0.0.1:5000',
      package: 'api.user',
      protoPath: './grpc-proto/user/index.proto',
    },
  } as GrpcOptions;

  const app = await NestFactory.createMicroservice(AppModule, grpcUser);

  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false },
  }));

  await app.listenAsync();
}

bootstrap().catch(err => {
  Logger.error(err);
  process.exit(1);
});
