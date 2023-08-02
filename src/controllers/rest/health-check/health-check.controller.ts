import { Public } from '@/engines/nest/modules/auth/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class SystemController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  @Public()
  healthCheck() {
    return this.service.execute();
  }
}
