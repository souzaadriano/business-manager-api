import { Session } from '@/core/domain/class/session/session.class';
import { AbstractUseCase } from '@/core/use-cases/use-case.abstract';

export interface IRequestHandler<RESPONSE> {
  execute<INPUT, OUTPUT>(useCase: AbstractUseCase<INPUT, OUTPUT>, input: INPUT, session?: Session): Promise<RESPONSE>;
}
