import { rest } from '@/controllers/rest';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: rest.constrollers,
  providers: rest.providers,
})
export class RestModule {}
