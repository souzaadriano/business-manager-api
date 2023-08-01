import { AbstractConfiguration, Environment } from 'environment-variables-decorator';

export class RedisConfig extends AbstractConfiguration {
  @Environment('REDIS_HOST')
  host: string;

  @Environment('REDIS_PORT')
  port: number;

  @Environment('REDIS_PASSWORD')
  password: string;
}
