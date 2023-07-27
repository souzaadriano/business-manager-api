import { IUseCase } from '@/core/use-cases/use-case.contract';

export interface IRequestHandler<RESPONSE> {
  execute<INPUT, OUTPUT>(input: INPUT, useCase: IUseCase<INPUT, OUTPUT>): Promise<RESPONSE>;
}
