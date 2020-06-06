import { RpcException } from '@nestjs/microservices';
import { IExceptionMessage } from './core.exception-message';

export class BaseException extends RpcException {
  constructor(message: IExceptionMessage) {
    super(message);
  }
}
