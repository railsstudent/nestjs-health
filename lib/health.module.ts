import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigurableModuleClass } from './health-module-definition';
import { HealthService } from './services';
import { HealthController } from './controllers';
import { BullQueueHealthIndicator } from './indicators';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, BullQueueHealthIndicator],
  exports: [HealthService],
})
export class HealthModule extends ConfigurableModuleClass {}
