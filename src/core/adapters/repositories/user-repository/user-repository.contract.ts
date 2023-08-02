import { Email } from '@/core/domain/class/email/email.class';
import { Hash } from '@/core/domain/class/hash/hash.class';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { UserModel } from '@/core/domain/entities/user/user.model';

export interface IUserRepository {
  save(input: UserModel): Promise<void>;
  findByEmail(email: Email): Promise<UserModel | undefined>;
  findById(id: Uuid): Promise<UserModel | undefined>;
  listUserPermissions(userId: string): Promise<PERMISSIONS[]>;
  listUserStores(userId: string): Promise<string[]>;
  getPermissions(user: UserModel): Promise<Permissions>;
  updateUser(user: TUpdateUser): Promise<UserModel>;
  softDelete(id: Uuid): Promise<void>;
}

export type TUpdateUser = {
  email?: Email;
  password?: Hash;
  name?: string;
  id: Uuid;
};
