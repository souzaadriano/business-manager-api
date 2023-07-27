import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IEngine } from '../engine.contract';
import { MainModule } from './modules/main.module';
import { NestConfig } from './nest.config';

export class NestEngine implements IEngine {
  private readonly _configuration = new NestConfig();
  async init(): Promise<void> {
    const app = await NestFactory.create(MainModule);
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    );
    await app.listen(this._configuration.port);
  }
}
