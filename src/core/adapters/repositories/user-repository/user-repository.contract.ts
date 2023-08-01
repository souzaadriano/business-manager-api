import { Email } from '@/core/domain/class/email/email.class';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { UserModel } from '@/core/domain/entities/user/user.model';

export interface IUserRepository {
  save(input: UserModel): Promise<void>;
  findByEmail(email: Email): Promise<UserModel | undefined>;
  listUserPermissions(userId: string): Promise<PERMISSIONS[]>;
  listUserStores(userId: string): Promise<string[]>;
  getPermissions(user: UserModel): Promise<Permissions>;
}
