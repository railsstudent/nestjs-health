import { Inject, Injectable } from '@nestjs/common';
import { Transport, RedisOptions } from '@nestjs/microservices';
import {
  HttpHealthIndicator,
  HealthCheckService,
  HealthCheckResult,
  HealthIndicatorFunction,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
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
    private microservice: MicroserviceHealthIndicator,
  ) {}

  check(): Promise<HealthCheckResult> {
    const indicatorFunctions: HealthIndicatorFunction[] = [];

    indicatorFunctions.push(() => this.http.pingCheck(this.options.app, this.options.backendUrl));

    if (this.options.shouldCheckDatabase) {
      indicatorFunctions.push(() => this.db.pingCheck('database'));
    }

    if (this.options.redisOptions) {
      indicatorFunctions.push(() =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: this.options.redisOptions,
          timeout: 5000,
        }),
      );
    }

    if (this.options.queueNames?.length) {
      indicatorFunctions.push(() => this.bull.isHealthy(this.options.queueNames));
    }

    if (this.options.indicatorFunctions?.length) {
      indicatorFunctions.push(...this.options.indicatorFunctions);
    }

    return this.health.check(indicatorFunctions);
  }
}
