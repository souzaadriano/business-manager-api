import { Address } from '@/core/domain/class/address/address.class';
import { Employees, TEmployee } from '@/core/domain/class/employees/employees.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { StoreModel } from '@/core/domain/entities/store/store.model';
import { TDateStatus } from '@/core/domain/types/date-status.type';
import { UsersAccessor } from '@/engines/database/accessors';
import { AddressAccessor } from '@/engines/database/accessors/address.accessor';
import { StoreAccessor } from '@/engines/database/accessors/stores.accessor';
import { IFindAddressByStoreIdResult } from '@/engines/database/queries/address.queries';
import { IFindStoreByIdResult } from '@/engines/database/queries/stores.queries';
import { IDateHandler } from '../../handlers/date-handler/date-handler.contract';
import { IStoreRepository } from './store-repository.contract';

export class StoreRepository implements IStoreRepository {
  constructor(private readonly _dependencies: Dependencies) {}

  async createStore(input: StoreModel): Promise<void> {
    await this._createStore(input);
    await this._createAddress(input.address);
    await this._createProfile(input);
  }

  async softDelete(id: Uuid) {
    const { storeAccessor } = this._dependencies;
    await storeAccessor.softDeleteStore({ deletedAt: new Date(), id: id.value });
  }

  async addUserToStore(storeId: Uuid, userId: Uuid) {
    const { storeAccessor } = this._dependencies;
    await storeAccessor.addUserToStore({ storeId: storeId.value, userId: userId.value });
  }

  async listActiveStores(): Promise<StoreModel[]> {
    const { storeAccessor } = this._dependencies;
    const stores = await storeAccessor.listActiveStores();
    return await Promise.all(stores.map((store) => this._instanceModel(store)));
  }

  async listAllStores(): Promise<StoreModel[]> {
    const { storeAccessor } = this._dependencies;
    const stores = await storeAccessor.listAllStores();
    return await Promise.all(stores.map((store) => this._instanceModel(store)));
  }

  async listEmployeesByStoreId(storeId: Uuid): Promise<Employees> {
    const { storeAccessor } = this._dependencies;
    const employees = await storeAccessor.listStoreEmployeesByStoreId({ storeId: storeId.value });
    return new Employees(
      storeId,
      employees.map((e): TEmployee => ({ id: e.userId, name: e.name })),
    );
  }

  async findStoreById(id: Uuid): Promise<StoreModel | undefined> {
    const { storeAccessor } = this._dependencies;
    const store = await storeAccessor.findStoreById({ id: id.value });
    if (!store) return undefined;
    return await this._instanceModel(store);
  }

  private async _instanceModel(store: IFindStoreByIdResult) {
    const { addressAccessor } = this._dependencies;
    const address = await addressAccessor.findAddressByStoreId({ id: store.addressId });
    const employees = await this.listEmployeesByStoreId(new Uuid(store.id));

    return new StoreModel({
      address: this._instanceAddress(address),
      dateStatus: this._createDates(store),
      employees,
      id: new Uuid(store.id),
      name: store.name,
      ownerId: new Uuid(store.ownerId),
      ownerName: store.ownerName,
      logo: store.logo,
    });
  }

  private _createDates(store: IFindStoreByIdResult): TDateStatus {
    const { dateHandler } = this._dependencies;
    return {
      createdAt: dateHandler.toDateTime(store.createdAt),
      updatedAt: dateHandler.toDateTime(store.updatedAt),
      deletedAt: dateHandler.toDateTime(store.deletedAt),
    };
  }

  private _instanceAddress(address: IFindAddressByStoreIdResult) {
    const { dateHandler } = this._dependencies;
    return new Address({
      id: new Uuid(address.id),
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      country: address.country,
      complement: address.complement,
      updatedAt: dateHandler.toDateTime(address.updatedAt),
    });
  }

  private async _createStore(input: StoreModel) {
    const { storeAccessor } = this._dependencies;

    await storeAccessor.createStore({
      id: input.id,
      name: input.name,
      owner: input.ownerId,
      updatedAt: input.updatedAt.value,
      createdAt: input.createdAt.value,
      deletedAt: input.deletedAt.value,
    });
  }

  private async _createAddress(address: Address) {
    const { addressAccessor } = this._dependencies;

    await addressAccessor.createAddress({
      id: address.id,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      country: address.country,
      complement: address.complement,
      updatedAt: address.updatedAt.value,
    });
  }

  private async _createProfile(input: StoreModel) {
    const { storeAccessor } = this._dependencies;
    await storeAccessor.createStoreProfile({
      storeId: input.id,
      addressId: input.address.id,
      logo: input.logo,
    });
  }
}

type Dependencies = {
  userAccessor: UsersAccessor;
  storeAccessor: StoreAccessor;
  addressAccessor: AddressAccessor;
  dateHandler: IDateHandler;
};
