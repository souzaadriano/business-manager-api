import { IDateHandler } from '@/core/adapters/handlers/date-handler/date-handler.contract';
import { IGeneratorHandler } from '@/core/adapters/handlers/generator-handler/generator-handler.contract';
import { IStoreRepository } from '@/core/adapters/repositories/store-repository/store-repository.contract';
import { IUserRepository } from '@/core/adapters/repositories/user-repository/user-repository.contract';
import { TAddress } from '@/core/domain/class/address/address.class';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Session } from '@/core/domain/class/session/session.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { UserDTO } from '@/core/domain/dtos/user.dto';
import { StoreModel } from '@/core/domain/entities/store/store.model';
import { AbstractUseCase } from '../../use-case.abstract';

export class CreateStoreUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: Input): Promise<Output> {
    const { storeRepository } = this._dependencies;
    const store = await this._createStore(input);
    await storeRepository.createStore(store);

    return { address: input.address, name: store.name, id: store.id, owner: store.owner };
  }

  private async _createStore(input: Input) {
    const { address, name, session, userId } = input;
    const { dateHandler, generatorHandler } = this._dependencies;
    const user = await this._getUser(session, userId);

    return StoreModel.create({
      address,
      dateHandler,
      generatorHandler,
      name,
      user,
    });
  }

  private async _getUser(session: Session, userId?: string): Promise<UserDTO> {
    if (!userId) return session.getUser();
    if (!session.hasPermission(PERMISSIONS.CREATE_STORE)) throw new Error('');
    const { userRepository } = this._dependencies;
    const user = await userRepository.findById(Uuid.create(userId));
    if (!user) throw new Error();
    return user.toDto();
  }
}

type Input = { session?: Session; name: string; address: TAddress; userId?: string };
type Output = { address: TAddress; id: string; owner: string; name: string };
type Dependencies = {
  userRepository: IUserRepository;
  storeRepository: IStoreRepository;
  dateHandler: IDateHandler;
  generatorHandler: IGeneratorHandler;
};
