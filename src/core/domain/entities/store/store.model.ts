import { IDateHandler } from '@/core/adapters/handlers/date-handler/date-handler.contract';
import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { DateHelper } from '@/helpers/date-helper';
import { Address, TAddress } from '../../class/address/address.class';
import { DateTime } from '../../class/date-time/date-time.class';
import { Employees } from '../../class/employees/employees.class';
import { Uuid } from '../../class/uuid/uuid.class';
import { UserDTO } from '../../dtos/user.dto';
import { TDateStatus } from '../../types/date-status.type';
import { UserModel } from '../user/user.model';

export class StoreModel {
  private readonly _id: Uuid;
  private readonly _owner: TStoreOwner;
  private readonly _dateStatus: TDateStatus;

  readonly name: string;
  readonly employees: Employees;
  readonly address: Address;
  readonly logo?: string;

  constructor(parameters: TStoreModelConstructor) {
    this._id = parameters.id;
    this.name = parameters.name;
    this._dateStatus = parameters.dateStatus;
    this.employees = parameters.employees;
    this.address = parameters.address;
    this.logo = parameters.logo;
    this._owner = {
      id: parameters.ownerId,
      name: parameters.ownerName,
    };
  }

  static create(input: TStoreModelCreateInput): StoreModel {
    const { generatorHandler, dateHandler, ...parameters } = input;
    const dateStatus = DateHelper.registerController(dateHandler);
    const uuid = generatorHandler.uuid();

    return new StoreModel({
      id: uuid,
      address: Address.create({ dateHandler, generatorHandler, ...parameters.address }),
      name: parameters.name,
      ownerId: Uuid.create(parameters.user.id),
      ownerName: parameters.user.name,
      employees: new Employees(uuid),
      logo: parameters.logo,
      dateStatus,
    });
  }

  get id() {
    return this._id.value;
  }

  get owner() {
    return this._owner.name;
  }

  get ownerId() {
    return this._owner.id.value;
  }

  get createdAt(): DateTime {
    return this._dateStatus.createdAt;
  }

  get updatedAt(): DateTime {
    return this._dateStatus.updatedAt;
  }

  get deletedAt(): DateTime | null {
    return this._dateStatus.deletedAt;
  }
}

type TStoreModelConstructor = {
  readonly id: Uuid;
  readonly ownerId: Uuid;
  readonly ownerName: string;
  readonly name: string;
  readonly dateStatus: TDateStatus;
  readonly employees: Employees;
  readonly address: Address;
  readonly logo?: string;
};

type TStoreModelCreateInput = {
  readonly generatorHandler: IGeneratorHandler;
  readonly dateHandler: IDateHandler;
  readonly user: UserModel | UserDTO;
  readonly name: string;
  readonly address: TAddress;
  readonly logo?: string;
};

type TStoreOwner = {
  name: string;
  id: Uuid;
};
