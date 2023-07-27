import { AbstractUseCase } from '@/core/use-cases/use-case.abstract';

export interface IRequestHandler<RESPONSE> {
  execute<INPUT, OUTPUT>(input: INPUT, useCase: AbstractUseCase<INPUT, OUTPUT>): Promise<RESPONSE>;
}
