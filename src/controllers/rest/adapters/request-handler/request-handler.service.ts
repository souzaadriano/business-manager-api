import { IRequestHandler } from '@/controllers/contracts/reqeust-handler.contract';
import { IUseCase } from '@/core/use-cases/use-case.contract';
import { Injectable } from '@nestjs/common';
import { RestExceptionHandler, TRestError } from '../exception-handler/exception-handler.service';

@Injectable()
export class RestRequestHandler implements IRequestHandler<TRestResponse> {
  constructor(private readonly _exceptionHandler: RestExceptionHandler) {}

  async execute<INPUT, OUTPUT>(input: INPUT, useCase: IUseCase<INPUT, OUTPUT>): Promise<TRestResponse> {
    try {
      const output = await useCase.handle(input);
      return { status: 200, output };
    } catch (error) {
      return this._errorToOutput(this._exceptionHandler.handle(error));
    }
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
