import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  private readonly _startedAt = new Date();
  execute() {
    const timestamp = Date.now();
    return {
      since: this._startedAt,
      timeUp: (timestamp - +this._startedAt) / 1000 / 60,
    };
  }
}
