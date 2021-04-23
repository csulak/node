import {
  Injectable,
  HttpService,
  Inject,
  CACHE_MANAGER,
  HttpException,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import { Pokemon } from './model/Pokemon';

export const API_URL = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonsService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**returns a list of pokemon that matches with the serchParam sent */
  getPokemons(offset: number) {
    return this.http
      .get(`${API_URL}/pokemon?limit=10&offset=${offset}`)
      .pipe(map((response) => response.data));
  }

  /**returns info related an specific gif id */
  async getPokemon(pokemonName: string): Promise<Observable<Pokemon>> {
    const pokemonInfo = await this.http
      .get(`${API_URL}//pokemon/${pokemonName}`)
      .pipe(map((response) => response.data))
      .pipe(
        map((poke) => {
          return new Pokemon(
            poke.name,
            poke.weight,
            poke.order,
            poke.base_experience,
          );
        }),
      )
      .pipe(
        catchError((e) => {
          throw new HttpException(
            {
              ...e.response.data,
              mensaje_personalizado: `no se pudo encontrar la info para el pokemon: ${pokemonName}`,
            },
            e.response.status,
          );
        }),
      );

    //return gifInfo.data;
    return pokemonInfo;
  }
}
