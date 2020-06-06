import { IsEmail, IsString, MaxLength } from 'class-validator';
import { api } from '../../grpc-proto/user/user';

export class InCreateUserDTO implements api.user.CreateUserReq {
  @IsEmail()
  @MaxLength(50)
  email!: string;

  @IsString()
  @MaxLength(50)
  name!: string;

  @IsString()
  @MaxLength(128)
  password!: string;
}
