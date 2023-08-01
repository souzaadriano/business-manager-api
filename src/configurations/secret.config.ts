import { AbstractConfiguration, Environment, Singleton } from 'environment-variables-decorator';

@Singleton
export class SecretConfig extends AbstractConfiguration {
  @Environment('SECRET_JWT')
  jwt: string;
}
