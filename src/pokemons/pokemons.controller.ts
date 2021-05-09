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
import { Observable } from 'rxjs';
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
  getGifs(@Param('offset') offset: number) {
    console.log('this call is going to be redis cached');
    console.log('retrieving list of pokemons with offset: ', offset, '\n');
    return this.pokemonsService.getPokemons(offset);
  }

  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Return info related to an specific pokemon searched',
  })
  @Get('/specificPokemons/:pokemonName')
  getGif(
    @Param('pokemonName') pokemonName: string,
  ): Promise<Observable<Pokemon>> {
    console.log('this call is going to be redis cached');
    console.log('retrieving info by pokemon: ', pokemonName), '\n';
    return this.pokemonsService.getPokemon(pokemonName);
  }
}
