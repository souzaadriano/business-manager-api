import { Singleton } from '@/helpers/singleton.decorator';
import { AbstractConfiguration, Environment, ToStringArray } from 'environment-variables-decorator';
import { SEED_PURPOSE } from './seeds/seed.abstract';

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

  @ToStringArray({ splitBy: '|' })
  @Environment('SEED_PURPOSE', [SEED_PURPOSE.DEVELOPMENT_POPULATE])
  seedPurpose: string[];
}
