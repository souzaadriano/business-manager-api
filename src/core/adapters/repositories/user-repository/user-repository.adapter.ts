import { Email } from '@/core/domain/class/email/email.class';
import { Hash } from '@/core/domain/class/hash/hash.class';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { UserModel } from '@/core/domain/entities/user/user.model';
import { UsersAccessor } from '@/engines/database/accessors';
import { IFindByIdResult } from '@/engines/database/queries/users.queries';
import { IHashHandler } from '../../handlers/hash-handler/hash-handler.contract';
import { IUserRepository, TUpdateUser } from './user-repository.contract';

export class UserRepository implements IUserRepository {
  constructor(private readonly _dependencies: Dependencies) {}

  async save(user: UserModel): Promise<void> {
    const { userAccessor } = this._dependencies;

    await userAccessor.createUser({
      email: user.email,
      hash: user.hash.value,
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
      updatedAt: user.updatedAt,
    });
  }

  async findByEmail(email: Email): Promise<UserModel | undefined> {
    const { userAccessor } = this._dependencies;
    const user = await userAccessor.findByEmail({ email: email.value });
    if (!user) return undefined;

    return this._createUser(user);
  }

  async findById(id: Uuid): Promise<UserModel | undefined> {
    const { userAccessor } = this._dependencies;
    const user = await userAccessor.findById({ id: id.value });
    if (!user) return undefined;

    return this._createUser(user);
  }

  async listUserPermissions(userId: string): Promise<PERMISSIONS[]> {
    const { userAccessor } = this._dependencies;

    const permissions = await userAccessor.findUserPermissionsByUserId({ userId });
    return permissions.map((p) => p.name as PERMISSIONS);
  }

  async listUserStores(userId: string): Promise<string[]> {
    const { userAccessor } = this._dependencies;
    const userStores = await userAccessor.findStoresByUserId({ userId });
    return userStores.map((store) => store.storeId);
  }

  async getPermissions(user: UserModel): Promise<Permissions> {
    const [permissions, stores] = await Promise.all([this.listUserPermissions(user.id), this.listUserStores(user.id)]);
    return Permissions.fromArray(permissions, stores);
  }

  async updateUser(user: TUpdateUser): Promise<UserModel> {
    const { userAccessor } = this._dependencies;
    const data = await userAccessor.findById({ id: user.id.value });

    await userAccessor.updateUser({
      id: user.id.value,
      updatedAt: new Date(),
      email: user.email.value ?? data.email,
      hash: user.password.value ?? data.hash,
      name: user.name ?? data.name,
    });

    return this._createUser({
      ...data,
      email: user.email.value ?? data.email,
      hash: user.password.value ?? data.hash,
      name: user.name ?? data.name,
    });
  }

  async softDelete(id: Uuid): Promise<void> {
    const { userAccessor } = this._dependencies;
    await userAccessor.softDeleteUser({ deletedAt: new Date(), id: id.value });
  }

  private _createUser(user: IFindByIdResult) {
    const { hashHandler } = this._dependencies;
    return new UserModel({
      uuid: new Uuid(user.id),
      email: new Email(user.email),
      name: user.name,
      hash: new Hash(user.hash, hashHandler),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }
}

export type Dependencies = {
  hashHandler: IHashHandler;
  userAccessor: UsersAccessor;
};
