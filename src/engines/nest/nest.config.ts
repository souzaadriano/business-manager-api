import { Singleton } from '@/helpers/singleton.decorator';
import { Environment } from 'environment-variables-decorator';

@Singleton
export class NestConfig {
  @Environment('APP_PORT')
  port: number;

  @Environment('APP_NAME')
  name: string;
}
