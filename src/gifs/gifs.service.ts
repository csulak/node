import {
  Injectable,
  HttpService,
  Inject,
  CACHE_MANAGER,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Gif } from './model/Gif';

export const API_KEY = 'Sc9MBZzmvQXVCYeC4imY4vOcOeQty4Hc';

export const API_URL = 'https://api.giphy.com/v1';

@Injectable()
export class GifsService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**returns a list of gif that matches with the serchParam sent */
  async getGifs(searchParam: string) {
    const gifsList = await this.http
      .get(
        `${API_URL}/gifs/search?api_key=${API_KEY}&q=${searchParam}&limit=10&offset=0&lang=en`,
      )
      .toPromise()
      .then((response) => response.data);

    console.log(gifsList);

    const gifsLista = [];
    gifsList.data.forEach((element) => {
      const gifInfo = new Gif(
        element.type,
        element.id,
        element.url,
        element.title,
      );
      gifsLista.push(gifInfo);
    });

    return gifsLista;
  }

  /**returns info related an specific gif id */
  async getGif(gifId: string): Promise<Gif> {
    const gifInfoResponse = await this.http
      .get(`${API_URL}/gifs/${gifId}?api_key=${API_KEY}`)
      .toPromise()
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status === 404) {
          throw new NotFoundException(
            `Could not find gif =( with id: ${gifId}`,
          );
        }
      });

    const gifInfo = new Gif(
      gifInfoResponse.data.type,
      gifInfoResponse.data.id,
      gifInfoResponse.data.url,
      gifInfoResponse.data.title,
    );

    return gifInfo;
  }
}
