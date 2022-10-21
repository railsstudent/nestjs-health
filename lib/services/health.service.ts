import {
  HttpHealthIndicator,
  HealthCheckService,
  HealthCheckResult,
  HealthIndicatorFunction,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from '../health-module-definition';
import { HealthModuleOptions } from '../interfaces';
import { BullQueueHealthIndicator } from '../indicators';

@Injectable()
export class HealthService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: HealthModuleOptions,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private bull: BullQueueHealthIndicator,
  ) {}

  check(): Promise<HealthCheckResult> {
    const indicatorFunctions: HealthIndicatorFunction[] = [];

    indicatorFunctions.push(() => this.http.pingCheck(this.options.app, this.options.backendUrl));

    if (this.options.shouldCheckDatabase) {
      indicatorFunctions.push(() => this.db.pingCheck('database'));
    }

    if (this.options.queueNames?.length) {
      indicatorFunctions.push(() => this.bull.isHealthy(this.options.queueNames));
    }

    return this.health.check(indicatorFunctions);
  }
}
