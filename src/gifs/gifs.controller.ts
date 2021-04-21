import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GifsService } from './gifs.service';
import { Gif } from './interfaces/Gif';

@Controller('gifs')
export class GifsController {
  constructor(private gifsService: GifsService) {}

  /** Adding Mem Cache on this endpoint */
  // If I set the cache key here, for 20 secs (TTL) every search (with different parameters) is going to return the same info.
  //@CacheKey('GIFS')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @Get(':searchParam')
  getGifs(@Param('searchParam') searchParam: string) {
    console.log('this call is going to be mem cached');
    console.log('searchings gifs by param: ', searchParam);
    return this.gifsService.getGifs(searchParam);
  }

  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @Get('/specificGif/:gifId')
  getGif(@Param('gifId') gifId: string): Promise<Observable<Gif>> {
    console.log('this call is going to be mem cached');
    console.log('retrieving info by Gif Id:', gifId);
    return this.gifsService.getGif(gifId);
  }
}
