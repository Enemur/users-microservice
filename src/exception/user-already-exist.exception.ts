import { BaseException } from '../core/exception/base.exception';
import { ExceptionCode } from '../core/const/exception-code.enum';

export class UserAlreadyExistException extends BaseException {
  constructor() {
    super(
      {
        code: ExceptionCode.ALREADY_EXIST,
        message: 'User already exist',
      }
    );
  }
}
