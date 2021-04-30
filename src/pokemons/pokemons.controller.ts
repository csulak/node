import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pokemon } from './model/Pokemon';
import { PokemonsService } from './pokemons.service';

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonsService: PokemonsService) {}

  /** Adding Redis Cache on this endpoint */
  // If I set the cache key here, for 60 secs (TTL) every search (for different parameters) is going to return the same info.
  //@CacheKey('POKEMONS')
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Return Pokemons list',
    description:
      'You must to send an offset (int number) that is going to be the number of pokemons returned ',
  })
  @Get(':offset')
  getPokemons(@Param('offset') offset: number): Promise<any> {
    console.log('this call is going to be redis cached');
    console.log('retrieving list of pokemons with offset: ', offset);
    return this.pokemonsService.getPokemons(offset);
  }

  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Return info related to an specific pokemon searched',
  })
  @Get('/specificPokemon/:pokemonName')
  getPokemon(@Param('pokemonName') pokemonName: string): Promise<Pokemon> {
    console.log('this call is going to be redis cached');
    console.log('retrieving info by pokemon: ', pokemonName);
    return this.pokemonsService.getPokemon(pokemonName);
  }
}
