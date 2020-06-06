import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { from, Observable } from 'rxjs';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  getUserById(userId: string): Observable<UserEntity | undefined> {
    return from(this.findOne({ where: { id: userId } }));
  }

  getUserByEmail(email: string): Observable<UserEntity | undefined> {
    return from(this.findOne({ where: { email } }))
  }
}
