import { Email } from '@/core/domain/class/email/email.class';
import { UserModel } from '@/core/domain/entities/user/user.model';

export interface IUserRepository {
  save(input: UserModel): Promise<void>;
  findByEmail(email: Email): Promise<UserModel | undefined>;
}
