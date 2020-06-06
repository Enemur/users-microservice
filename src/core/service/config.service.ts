import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { IEnvConfig } from '../abstract/env-config.interface';
import { JoiSchema } from '../const/joi-schema.const';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env as any);
  }

  private validateInput(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(JoiSchema);

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      { allowUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  public get countSaltsRound(): number {
    return this.envConfig.COUNT_SALT_ROUNDS;
  }

  get tsNode(): boolean {
    return this.envConfig.TS_NODE;
  }

  get database() {
    return {
      host: this.envConfig.DATABASE_HOST,
      port: this.envConfig.DATABASE_PORT,
      username: this.envConfig.DATABASE_USERNAME,
      password: this.envConfig.DATABASE_PASSWORD,
      database: this.envConfig.DATABASE_NAME,
      synchronize: this.envConfig.DATABASE_SYNCHRONIZE,
      logging: this.envConfig.DATABASE_LOGGING,
      keepConnectionAlive: this.envConfig.DATABASE_KEEP_CONNECTION_ALIVE,
      migrations: {
        run: this.envConfig.DATABASE_MIGRATIONS_RUN,
        tableName: this.envConfig.DATABASE_MIGRATIONS_TABLE_NAME,
      },
      ssl: {
        ca: this.envConfig.DATABASE_SSL_CA,
        key: this.envConfig.DATABASE_SSL_KEY,
        cert: this.envConfig.DATABASE_SSL_CERT,
        isUse: this.envConfig.IS_USE_SSL,
      },
    };
  }
}
