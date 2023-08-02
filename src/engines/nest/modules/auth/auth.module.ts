import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
  exports: [],
})
export class AuthModule {}
