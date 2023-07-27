import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserSchema {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 256)
  password: string;
}
