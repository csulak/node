import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonsService: PokemonsService) {}

  /** Adding Redis Cache on this endpoint */
  // If I set the cache key here, for 60 secs (TTL) every search (for different parameters) is going to return the same info.
  //@CacheKey('POKEMONS')
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  @Get(':offset')
  getGifs(@Param('offset') offset: number) {
    console.log('this call is going to be redis cached');
    console.log('retrieving list of pokemons with offset: ', offset);
    return this.pokemonsService.getPokemons(offset);
  }

  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  @Get('/specificPokemons/:pokemonName')
  getGif(@Param('pokemonName') pokemonName: string) {
    console.log('this call is going to be redis cached');
    console.log('retrieving info by pokemon: ', pokemonName);
    return this.pokemonsService.getPokemon(pokemonName);
  }
}
