import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { Session } from '@/core/domain/class/session/session.class';
import { SessionDto } from '@/core/domain/class/session/session.dto';
import { UserToken } from '@/core/domain/class/token/user-token.class';
import { UserModel } from '@/core/domain/entities/user/user.model';

export interface ISessionHandler {
  create(input: TCreateSessionInput): Promise<Session>;
  refreshTTL(session: Session, ttlInSeconds: number): Promise<void>;
  close(session: Session): Promise<void>;
  parseDTO(sessionDto: SessionDto): Promise<Session>;
  find(userToken: UserToken): Promise<Session | undefined>;
}

export type TCreateSessionInput = {
  user: UserModel;
  permissions: Permissions;
};
