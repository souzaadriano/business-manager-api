import { Permissions } from '@/core/domain/class/permissions/permissions.class';
import { Session } from '@/core/domain/class/session/session.class';
import { SessionDto } from '@/core/domain/class/session/session.dto';
import { UserModel } from '@/core/domain/entities/user/user.model';

export interface ISessionHandler {
  create(input: TCreateSessionInput): Promise<Session>;
  refreshTTL(session: Session, ttlInSeconds: number): Promise<void>;
  close(session: Session): Promise<void>;
  parseDTO(sessionDto: SessionDto): Promise<Session>;
}

export type TCreateSessionInput = {
  user: UserModel;
  permissions: Permissions;
};
