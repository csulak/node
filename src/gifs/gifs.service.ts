import { Injectable, HttpService, Inject, CACHE_MANAGER } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Cache } from 'cache-manager';

export const API_KEY = 'Sc9MBZzmvQXVCYeC4imY4vOcOeQty4Hc';

export const API_URL = 'https://api.giphy.com/v1';

@Injectable()
export class GifsService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getGifs(searchParam: string) {
    return this.http
      .get(
        `${API_URL}/gifs/search?api_key=${API_KEY}&q=${searchParam}&limit=10&offset=0&lang=en`,
      )
      .pipe(map((response) => response.data));
  }

  getGif(gifId: string) {
    console.log({ gifId });
    return this.http
      .get(`${API_URL}/gifs/${gifId}?api_key=${API_KEY}`)
      .pipe(map((response) => response.data));
  }
}
