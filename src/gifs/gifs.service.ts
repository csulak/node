import {
  Injectable,
  HttpService,
  Inject,
  CACHE_MANAGER,
  HttpException,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { Gif } from './model/Gif';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

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
  async getGif(gifId: string): Promise<Observable<Gif>> {
    const gifInfo = await this.http
      .get(`${API_URL}/gifs/${gifId}?api_key=${API_KEY}`)
      // si descomentas la linea .toPromise(); y comentas todo par abajo, retornas una promesa y no un observable
      //.toPromise();
      .pipe(map((response) => response.data))
      .pipe(
        map((item) => {
          return new Gif(
            item.data.type,
            item.data.id,
            item.data.url,
            item.data.title,
          );
        }),
      )
      .pipe(
        catchError((e) => {
          throw new HttpException(
            {
              ...e.response.data,
              mensaje_personalizado: `no se pudo encontrar la info para el Gif Id: ${gifId}`,
            },
            e.response.status,
          );
        }),
      );

    //return gifInfo.data;
    return gifInfo;
  }
}
