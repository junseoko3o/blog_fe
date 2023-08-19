import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
      }
    }),
  ],
  providers: [
    RedisCacheService,
  ]
})
export class RedisCacheModule {}
