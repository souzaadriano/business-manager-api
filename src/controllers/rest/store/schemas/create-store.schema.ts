import { Type } from 'class-transformer';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreateAddressSchema } from '../../shared/schemas/address.schema';

export class CreateStoreSchema {
  @ValidateNested()
  @Type(() => CreateAddressSchema)
  address: CreateAddressSchema;

  @IsString()
  @Length(4, 256)
  name: string;

  @IsString()
  @IsOptional()
  userId: string;
}
