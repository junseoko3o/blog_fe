import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async getKey(key: any) {
    return await this.redis.get(key);
  }

  async setKeyValue(key: any, value: string, option: any, ttl: number) {
    return await this.redis.set(key, value, option, ttl);
  }

  async deleteKeyValue(key: any) {
    return await this.redis.del(key);
  }
}
