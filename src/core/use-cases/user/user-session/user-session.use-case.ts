import { ISessionHandler } from '@/core/adapters/handlers/session-handler/session-handler.contract';
import { Session } from '@/core/domain/class/session/session.class';
import { UserToken } from '@/core/domain/class/token/user-token.class';
import { Uuid } from '@/core/domain/class/uuid/uuid.class';
import { AbstractUseCase } from '../../use-case.abstract';

export class UserSessionUseCase extends AbstractUseCase<Input, Output, Dependencies> {
  async execute(input: Input): Promise<Session> {
    const { sessionHandler } = this._dependencies;
    const userToken = this._instanceUserToken(input);
    const session = sessionHandler.find(userToken);
    if (!session) throw new Error();

    return session;
  }

  private _instanceUserToken(input: Input) {
    return new UserToken({
      sessionId: Uuid.create(input.sessionId),
      userId: Uuid.create(input.userId),
    });
  }
}

type Input = { sessionId: string; userId: string };
type Output = Session;
type Dependencies = {
  sessionHandler: ISessionHandler;
};
