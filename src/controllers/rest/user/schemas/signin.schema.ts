import { IsString } from 'class-validator';

export class SigninSchema {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
