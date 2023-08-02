import { IRequestHandler } from '@/controllers/contracts/reqeust-handler.contract';
import { Session } from '@/core/domain/class/session/session.class';
import { AbstractUseCase } from '@/core/use-cases/use-case.abstract';
import { Injectable } from '@nestjs/common';
import { RestExceptionHandler, TRestError } from '../exception-handler/exception-handler.service';

@Injectable()
export class RestRequestHandler implements IRequestHandler<TRestResponse> {
  constructor(private readonly _exceptionHandler: RestExceptionHandler) {}

  async execute<INPUT, OUTPUT>(
    useCase: AbstractUseCase<INPUT, OUTPUT>,
    input: INPUT,
    session?: Session,
  ): Promise<TRestResponse> {
    try {
      const output = await useCase.execute(this._setSessionToInput<INPUT>(input, session));
      return { status: 200, output };
    } catch (error) {
      return this._errorToOutput(this._exceptionHandler.handle(error));
    }
  }

  private _setSessionToInput<INPUT>(input: INPUT, session?: Session): INPUT {
    input['session'] = session;
    return input;
  }

  private _errorToOutput(error: TRestError): TRestResponse {
    const { status, ...output } = error;
    return { status, output };
  }
}

export type TRestResponse = {
  status: number;
  output: any;
};
