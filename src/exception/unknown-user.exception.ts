import { BaseException } from '../core/exception/base.exception';
import { ExceptionCode } from '../core/const/exception-code.enum';

export class UnknownUserException extends BaseException {
  constructor() {
    super(
      {
        code: ExceptionCode.INVALID_ARGUMENT,
        message: 'Unknown user exception',
      }
    );
  }
}
