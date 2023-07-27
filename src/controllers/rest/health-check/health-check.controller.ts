import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class SystemController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  healthCheck() {
    return this.service.execute();
  }
}
