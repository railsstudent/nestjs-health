import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from '../services';

@Controller('health')
export class HealthController {
  constructor(private health: HealthService) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check();
  }
}
