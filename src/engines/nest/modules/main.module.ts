import { Module } from '@nestjs/common';
import { RestModule } from './rest.module';

@Module({
  imports: [RestModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
