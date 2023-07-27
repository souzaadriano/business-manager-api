import { Singleton } from '@/helpers/singleton.decorator';
import { AbstractConfiguration, Environment } from 'environment-variables-decorator';

@Singleton
export class DatabaseConfig extends AbstractConfiguration {
  @Environment('DB_HOST')
  host: string;

  @Environment('DB_PASSWORD')
  password: string;

  @Environment('DB_USER')
  user: string;

  @Environment('DB_NAME')
  database: string;

  @Environment('DB_PORT')
  port: number;
}
