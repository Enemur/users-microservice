import { IsString, IsUUID } from 'class-validator';
import { api } from '../../grpc-proto/user/user';

export class InUpdateUserDTO implements api.user.UpdateUserReq {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;
}
