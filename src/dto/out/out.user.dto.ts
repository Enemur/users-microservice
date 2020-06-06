import { api } from '../../grpc-proto/user/user';

export class OutUserDTO implements api.user.User {
  email!: string;
  id!: string;
  name!: string;
}
