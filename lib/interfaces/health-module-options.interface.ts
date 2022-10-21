import { HealthIndicatorFunction } from '@nestjs/terminus';
import { RedisConnectOptions } from '../types';

export interface HealthModuleOptions {
  app: string;
  backendUrl: string;
  shouldCheckDatabase?: boolean;
  queueNames?: string[];
  redisOptions?: RedisConnectOptions;
  indicatorFunctions?: HealthIndicatorFunction[];
}
