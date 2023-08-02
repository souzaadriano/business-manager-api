import { CreateStoreFactory } from '@/factories/use-cases/create-store.factory';
import { Body, Controller, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { RestRequestHandler } from '../adapters/request-handler/request-handler.service';
import { CreateStoreSchema } from './schemas/create-store.schema';

@Controller('store')
export class StoreController {
  private readonly _createStore = CreateStoreFactory.instance();

  constructor(private readonly _requestHandler: RestRequestHandler) {}

  @Post()
  async createStore(@Body() input: CreateStoreSchema, @Response() response: ExpressResponse) {
    const { status, output } = await this._requestHandler.execute(input, this._createStore);
    return response.status(status).json(output);
  }
}
