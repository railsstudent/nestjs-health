<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
## Description

NestJS health check library.

## What does it do?

- Check backend application is running
- Optionally use TypeOrmHealthIndicator to ping default database that uses TypeORM
- Optionally check that redis is set up
- Optionally checl that bull queue is connect to redis and ready to accept jobs
- Provide custom indicator functions to execute
- Define /health endpoint to carry health check and output response

## Installation

```bash
$ npm install nestjs-health
```

## Register synchronously

```typescript
import { HealthModule } from 'nestjs-health';

@Module({
  HealthModule.forRoot({
    app: 'nestjs-health-terminus',
    backendUrl: 'http://localhost:3000',
    shouldCheckDatabase: true,
    queueNames: ['fibonacci', 'prime'],
    redisOptions: {
      host: 'localhost',
      port: 6379,
    },
  })
})
export class AppModule {}
```

## Register asynchronously

```typescript
import { HealthModule } from 'nestjs-health';

@Module({
  HealthModule.forRootAsync({
    inject: [ConfigService, HttpHealthIndicator],
    useFactory: (configService: ConfigService, http:  HttpHealthIndicator) => {
      return {
        app: 'nestjs-health-terminus',
        backendUrl: configService.get<string>('BACKEND_DOMAIN', ''),
        shouldCheckDatabase: true,
        queueNames: ['fibonacci', 'prime'],
        redisOptions: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 0),
        },
        indicatorFunctions: [
          () => http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
          () => http.pingCheck('angular-docs', 'https://angular.io/docs'),
        ],
      };
    },
  });
})
export class AppModule {}
```

## Route to /heath endpoint

```json
// http://localhost:3000/health

{
  "status": "ok",
  "info": {
    "nestjs-health-terminus": {
      "status": "up"
    },
    "database": {
      "status": "up"
    },
    "redis": {
      "status": "up"
    },
    "bull": {
      "status": "up"
    },
    "nestjs-docs": {
      "status": "up"
    },
    "angular-docs": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "nestjs-health-terminus": {
      "status": "up"
    },
    "database": {
      "status": "up"
    },
    "redis": {
      "status": "up"
    },
    "bull": {
      "status": "up"
    },
    "nestjs-docs": {
      "status": "up"
    },
    "angular-docs": {
      "status": "up"
    }
  }
}
```
