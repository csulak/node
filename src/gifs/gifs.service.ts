import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

export const API_KEY = 'Sc9MBZzmvQXVCYeC4imY4vOcOeQty4Hc';

export const API_URL = 'https://api.giphy.com/v1';

@Injectable()
export class GifsService {
  constructor(private http: HttpService) {}

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
