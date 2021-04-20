import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { GifsService } from './gifs.service';

@Controller('gifs')
export class GifsController {
  constructor(private gifsService: GifsService) {}

  /** Adding cache on this endpoint */
  // If I set the cache key here, for 20 secs (TTL) every search is going to return the same info.
  //@CacheKey('GIFS')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @Get(':searchParam')
  getGifs(@Param('searchParam') searchParam: string) {
    console.log('searchings gifs by param: ', searchParam);
    return this.gifsService.getGifs(searchParam);
  }

  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  @Get('/specificGif/:gifId')
  getGif(@Param('gifId') gifId: string) {
    console.log('retrieving info by Gif Id: ', gifId);
    return this.gifsService.getGif(gifId);
  }
}
