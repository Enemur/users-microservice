import { JoiSchemeMap } from '../type/joi-schema-map.type';
import { IEnvConfig } from '../abstract/env-config.interface';
import * as Joi from '@hapi/joi';

export const JoiSchema: JoiSchemeMap<IEnvConfig> = {
  TS_NODE: Joi.boolean().default(false),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().allow('').default(''),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
  DATABASE_LOGGING: Joi.boolean().default(false),
  DATABASE_KEEP_CONNECTION_ALIVE: Joi.boolean().default(true),
  DATABASE_MIGRATIONS_RUN: Joi.boolean().default(true),
  DATABASE_MIGRATIONS_TABLE_NAME: Joi.string().required(),
  DATABASE_SSL_CA: Joi.string().default('').allow(''),
  DATABASE_SSL_CERT: Joi.string().default('').allow(''),
  DATABASE_SSL_KEY: Joi.string().default('').allow(''),
  IS_USE_SSL: Joi.boolean().default(false),

  COUNT_SALT_ROUNDS: Joi.number().allow('').default(5),
};
