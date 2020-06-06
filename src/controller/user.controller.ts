import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InCreateUserDTO } from '../dto/in/in.create-user.dto';
import { Observable } from 'rxjs';
import { OutUserDTO } from '../dto/out/out.user.dto';
import { UserService } from '../service/user.service';
import { InUpdateUserDTO } from '../dto/in/in.update-user.dto';
import { InGetUserDTO } from '../dto/in/in.get-user.dto';
import { InSubscribeToUserDTO } from '../dto/in/in.subscribe-to-user.dto';

@Controller()
export class UserController {
  // region Injects

  @Inject(UserService)
  private readonly userService!: UserService;

  // endregion

  @GrpcMethod('UserService', 'CreateUser')
  public createUser(data: InCreateUserDTO): Observable<OutUserDTO> {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  public updateUser(data: InUpdateUserDTO): Observable<OutUserDTO> {
    return this.userService.updateUser(data);
  }

  @GrpcMethod('UserService', 'GetUser')
  public getUser(data: InGetUserDTO): Observable<OutUserDTO> {
    return this.userService.getUser(data);
  }

  @GrpcMethod("UserService", "GetUserStream")
  public getUserStream(data: InSubscribeToUserDTO): Observable<OutUserDTO> {
    return this.userService.getUserStream(data);
  }
}
