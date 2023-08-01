import { Email } from '@/core/domain/class/email/email.class';
import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { UserModel } from '@/core/domain/entities/user/user.model';

export interface IUserRepository {
  save(input: UserModel): Promise<void>;
  findByEmail(email: Email): Promise<UserModel | undefined>;
  findPermissions(userId: string): Promise<PERMISSIONS[]>;
  findStores(userId: string): Promise<string[]>;
}
