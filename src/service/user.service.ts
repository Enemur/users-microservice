import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../core/service/config.service';
import { from, Observable, Subject } from 'rxjs';
import { api } from '../grpc-proto/user/user';
import { hash } from 'bcrypt';
import { map, switchMap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../repository/users.repository';
import { UserAlreadyExistException } from '../exception/user-already-exist.exception';
import { UnknownUserException } from '../exception/unknown-user.exception';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  // region Injects

  @Inject(ConfigService)
  private readonly configService!: ConfigService;

  @InjectRepository(UsersRepository)
  private readonly usersRepository!: UsersRepository;

  // endregion

  // region Private Fields

  private readonly updateUsersSubjects: Map<string, Subject<api.user.User>> = new Map();

  // endregion

  // region Public Methods

  public createUser(data: api.user.CreateUserReq): Observable<api.user.User> {
    const countSaltsRound = this.configService.countSaltsRound;

    return this.usersRepository.getUserByEmail(data.email).pipe(
      map((entity: UserEntity | undefined) => {
        if (entity) {
          throw new UserAlreadyExistException();
        }

        return entity;
      }),

      switchMap(() => from(hash(data.password, countSaltsRound))),

      switchMap((hash: string) => from(this.usersRepository.save({
        email: data.email,
        name: data.name,
        passwordHash: hash,
      }))),

      map((entity: UserEntity) => {
        return {
          id: entity.id,
          name: entity.name,
          email: entity.email,
        };
      }),
    )
  }

  public updateUser(data: api.user.UpdateUserReq): Observable<api.user.User> {
    return this.usersRepository.getUserById(data.id).pipe(
       map((entity: UserEntity | undefined) => {
        if (!entity) {
          throw new UnknownUserException();
        }

        return entity;
      }),
      switchMap((entity: UserEntity) => from(
        this.usersRepository.save({
          ...entity,
          name: data.name,
        }
      ))),
      map((entity: UserEntity) => {
        const result: api.user.User = {
          id: entity.id,
          name: entity.name,
          email: entity.email,
        }

        const subject = this.updateUsersSubjects.get(entity.id);
        subject?.next(result);

        return result;
      }),
    );
  }

  public getUser(data: api.user.UserReq): Observable<api.user.User> {
    return this.usersRepository.getUserById(data.id).pipe(map(entity => {
      if (!entity) {
        throw new UnknownUserException();
      }

      return entity;
    }));
  }

  public getUserStream(data: api.user.UserStreamReq): Observable<api.user.User> {
    let subject = this.updateUsersSubjects.get(data.id);

    if (!subject) {
      subject = new Subject<api.user.User>();
      this.updateUsersSubjects.set(data.id, subject);
    }

    return subject.asObservable();
  }

  // endregion
}
