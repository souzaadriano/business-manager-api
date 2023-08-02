import { PERMISSIONS } from '@/core/domain/class/permissions/permission.enum';
import { Session } from '@/core/domain/class/session/session.class';
import { Permission } from '@/engines/nest/modules/auth/permission.decorator';
import { UserSession } from '@/engines/nest/modules/auth/user-session.decorator';
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
  @Permission(PERMISSIONS.CREATE_STORE, PERMISSIONS.CREATE_OWN_STORE)
  async createStore(
    @Body() input: CreateStoreSchema,
    @UserSession() session: Session,
    @Response() response: ExpressResponse,
  ) {
    const { status, output } = await this._requestHandler.execute(this._createStore, input, session);
    return response.status(status).json(output);
  }
}
