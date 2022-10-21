import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigurableModuleClass } from './health-module-definition';
import { HealthService } from './services';

@Module({
  imports: [TerminusModule],
  controllers: [],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule extends ConfigurableModuleClass {}
