import { IsUUID } from 'class-validator';
import { api } from '../../grpc-proto/user/user';

export class InGetUserDTO implements api.user.UserStreamReq {
  @IsUUID()
  id!: string;
}
