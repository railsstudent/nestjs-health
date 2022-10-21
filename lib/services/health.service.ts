import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from '../health-module-definition';
import { HealthModuleOptions } from '../interfaces';

@Injectable()
export class HealthService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: HealthModuleOptions) {
    console.log(this.options);
  }
}
