import { CreateUserFactory } from '@/factories/use-cases/create-user.factory';
import { SigninFactory } from '@/factories/use-cases/signin.factory';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { RestRequestHandler } from '../adapters/request-handler/request-handler.service';
import { CreateUserSchema } from './schemas';
import { SigninSchema } from './schemas/signin.schema';

@Controller('user')
export class UserController {
  private readonly _createUser = CreateUserFactory.instance();
  private readonly _signin = SigninFactory.instance();

  constructor(private readonly _requestHandler: RestRequestHandler) {}

  @Post()
  async createUser(@Body() input: CreateUserSchema, @Response() response: ExpressResponse) {
    const { status, output } = await this._requestHandler.execute(input, this._createUser);
    return response.status(status).json(output);
  }

  @Post('signin')
  async startSession(@Body() input: SigninSchema, @Response() response: ExpressResponse) {
    const { status, output } = await this._requestHandler.execute(input, this._signin);
    return response.status(status).json(output);
  }

  @Get()
  async listUsers() {}
}
