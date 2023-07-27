import { CreateUserFactory } from '@/factories/use-cases/create-user.factory';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { RestRequestHandler } from '../adapters/request-handler/request-handler.service';
import { CreateUserSchema } from './schemas';

@Controller('user')
export class UserController {
  private readonly _createUser = CreateUserFactory.instance();

  constructor(private readonly _requestHandler: RestRequestHandler) {}

  @Post()
  async createUser(@Body() input: CreateUserSchema, @Response() response: ExpressResponse) {
    const { status, output } = await this._requestHandler.execute(input, this._createUser);
    return response.status(status).json(output);
  }

  @Get()
  async listUsers() {}
}
