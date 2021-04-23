import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

@Module({
  /** Adding Redis cache on Pokemons */
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService],
  exports: [HttpModule, CacheModule],
})
export class PokemonsModule {}
