import {
  Injectable,
  HttpService,
  Inject,
  CACHE_MANAGER,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Pokemon } from './model/Pokemon';

export const API_URL = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonsService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**returns a list of pokemon that matches with the serchParam sent */
  getPokemons(offset: number): Promise<any> {
    const pokemonsList = this.http
      .get(`${API_URL}/pokemon?limit=10&offset=${offset}`)
      .toPromise()
      .then((response) => response.data);

    return pokemonsList;
  }

  /**returns info related an specific pokemon name */
  async getPokemon(pokemonName: string): Promise<Pokemon> {
    const pokemonInfoResponse = await this.http
      .get(`${API_URL}//pokemon/${pokemonName}`)
      .toPromise()
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status === 404) {
          throw new NotFoundException(
            `Could not find pokemon =( with name: ${pokemonName}`,
          );
        }
      });

    const pokemonInfo = new Pokemon(
      pokemonInfoResponse.name,
      pokemonInfoResponse.weight,
      pokemonInfoResponse.order,
      pokemonInfoResponse.base_experience,
    );

    return pokemonInfo;
  }
}
