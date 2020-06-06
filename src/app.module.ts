import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './core/service/config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [
    CoreModule,

    TypeOrmModule.forFeature([
      UsersRepository,
    ]),

    TypeOrmModule.forRootAsync({
      imports: [ CoreModule ],

      useFactory: (configService: ConfigService) => {
        const ssl = (configService.database.ssl.isUse) ? {
          ca: configService.database.ssl.ca,
          cert: configService.database.ssl.cert,
          key: configService.database.ssl.key,
          rejectUnauthorized: false,
        } : undefined;

        return {
          type: "postgres",
          host: configService.database.host,
          port: configService.database.port,
          database: configService.database.database,
          username: configService.database.username,
          password: configService.database.password,
          migrationsTableName: configService.database.migrations.tableName,
          migrationsRun: configService.database.migrations.run,
          synchronize: configService.database.synchronize,
          keepConnectionAlive: configService.database.keepConnectionAlive,
          namingStrategy: new SnakeNamingStrategy(),
          logging: configService.database.logging,
          ssl,
          entities:  [ (configService.tsNode) ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js' ],
          migrations:  [ (configService.tsNode) ? 'src/**/*Migration.ts' : 'dist/**/*Migration.js' ],
          cli: {
            migrationsDir: 'src/migration',
          },
        } as TypeOrmModuleOptions;
      },

      inject: [ ConfigService ],
    })
  ],
  providers: [
    UserService,
  ],
  controllers: [
    UserController,
  ],
})
export class AppModule {}
