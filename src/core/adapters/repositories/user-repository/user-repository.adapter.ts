import { Email } from '@/core/domain/class/email/email.class';
import { Hash } from '@/core/domain/class/hash/hash.class';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { UserModel } from '@/core/domain/entities/user/user.model';
import { UsersAccessor } from '@/engines/database/accessors';
import { IHashHandler } from '../../handlers/hash-handler/hash-handler.contract';
import { IUserRepository } from './user-repository.contract';

export class UserRepository implements IUserRepository {
  constructor(private readonly _dependencies: Dependencies) {}

  async getPermissions(user: UserModel): Promise<Permissions> {
    const [permissions, storeIds] = await Promise.all([
      this.listUserPermissions(user.id),
      this.listUserStores(user.id),
    ]);

    return Permissions.fromArray(permissions, storeIds);
  }

  async listUserPermissions(userId: string): Promise<PERMISSIONS[]> {
    const { usersAccessor } = this._dependencies;
    const permissions = await usersAccessor.findPermissionsByUserId({ userId });
    return permissions.map((p) => p.name as PERMISSIONS);
  }

  async listUserStores(userId: string): Promise<string[]> {
    const { usersAccessor } = this._dependencies;
    const permissions = await usersAccessor.findStoresByUserId({ userId });
    return permissions.map((p) => p.storeId);
  }

  async findByEmail(email: Email): Promise<UserModel | undefined> {
    const { usersAccessor, hashHandler } = this._dependencies;
    const user = await usersAccessor.findByEmail({
      email: email.value,
    });

    if (!user) return undefined;

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

  async save(user: UserModel): Promise<void> {
    const { usersAccessor } = this._dependencies;

    await usersAccessor.createUser({
      email: user.email,
      hash: user.hash.value,
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
      updatedAt: user.updatedAt,
    });
  }
}

export type Dependencies = {
  usersAccessor: UsersAccessor;
  hashHandler: IHashHandler;
};
