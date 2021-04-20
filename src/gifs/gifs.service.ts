import {
  Injectable,
  HttpService,
  Inject,
  CACHE_MANAGER,
  HttpException,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Cache } from 'cache-manager';

export const API_KEY = 'Sc9MBZzmvQXVCYeC4imY4vOcOeQty4Hc';

export const API_URL = 'https://api.giphy.com/v1';

@Injectable()
export class GifsService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**returns a list of gif that matches with the serchParam sent */
  getGifs(searchParam: string) {
    return this.http
      .get(
        `${API_URL}/gifs/search?api_key=${API_KEY}&q=${searchParam}&limit=10&offset=0&lang=en`,
      )
      .pipe(map((response) => response.data));
  }

  /**returns info related an specific gif id */
  getGif(gifId: string) {
    const gifInfo = this.http
      .get(`${API_URL}/gifs/${gifId}?api_key=${API_KEY}`)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((e) => {
          console.log('asdasd', e.response.data);
          throw new HttpException(
            {
              ...e.response.data,
              mensaje_personalizado: `no se pudo encontrar la info para el Gif Id: ${gifId}`,
            },
            e.response.status,
          );
        }),
      );

    return gifInfo;
  }
}
