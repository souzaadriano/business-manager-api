import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RestModule } from './rest.module';

@Module({
  imports: [RestModule, AuthModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
