import { StoreModel } from '@/core/domain/entities/store/store.model';

export interface IStoreRepository {
  createStore(input: StoreModel): Promise<void>;
}
