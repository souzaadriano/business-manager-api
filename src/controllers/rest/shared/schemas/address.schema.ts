import { IsString } from 'class-validator';

export class CreateAddressSchema {
  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsString()
  country: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;
}
