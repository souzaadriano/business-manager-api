import { StoreRepository } from '@/core/adapters/repositories/store-repository/store-repository.adapter';
import { IStoreRepository } from '@/core/adapters/repositories/store-repository/store-repository.contract';
import { UsersAccessor } from '@/engines/database/accessors';
import { AddressAccessor } from '@/engines/database/accessors/address.accessor';
import { StoreAccessor } from '@/engines/database/accessors/stores.accessor';
import { DateHandlerFactory } from '../adapters';

export class StoreRepositoryFactory {
  private static _instance: IStoreRepository;

  static instance(): IStoreRepository {
    if (!StoreRepositoryFactory._instance) {
      StoreRepositoryFactory._instance = new StoreRepository({
        addressAccessor: new AddressAccessor(),
        dateHandler: DateHandlerFactory.instance(),
        storeAccessor: new StoreAccessor(),
        userAccessor: new UsersAccessor(),
      });
    }

    return StoreRepositoryFactory._instance;
  }
}
