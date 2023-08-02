import { IDateHandler } from '@/core/adapters/handlers/date-handler/date-handler.contract';
import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { DateTime } from '../date-time/date-time.class';
import { Uuid } from '../uuid/uuid.class';

export class Address {
  private readonly _id: Uuid;
  readonly street: string;
  readonly neighborhood: string;
  readonly country: string;
  readonly number: string;
  readonly complement: string;
  readonly updatedAt: DateTime;

  constructor(parameters: TAddressConstructor) {
    this._id = parameters.id;
    this.street = parameters.street;
    this.neighborhood = parameters.neighborhood;
    this.country = parameters.country;
    this.number = parameters.number;
    this.complement = parameters.complement;
    this.updatedAt = parameters.updatedAt;
  }

  static create(input: TAddressCreate) {
    const { dateHandler, generatorHandler, ...rest } = input;
    return new Address({
      id: generatorHandler.uuid(),
      updatedAt: dateHandler.toDateTime(new Date()),
      ...rest,
    });
  }

  get id() {
    return this._id.value;
  }
}

type TAddressConstructor = {
  id: Uuid;
  street: string;
  neighborhood: string;
  country: string;
  number: string;
  complement: string;
  updatedAt: DateTime;
};

type TAddressCreate = {
  generatorHandler: IGeneratorHandler;
  dateHandler: IDateHandler;
  street: string;
  neighborhood: string;
  country: string;
  number: string;
  complement: string;
};

export type TAddress = {
  street: string;
  neighborhood: string;
  country: string;
  number: string;
  complement: string;
};
