import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HealthModuleOptions } from './interfaces';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<HealthModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
