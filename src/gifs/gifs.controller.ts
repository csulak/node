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
  @CacheKey('GIFS')
  @CacheTTL(20)
  @Get(':searchParam')
  @UseInterceptors(CacheInterceptor)
  getGifs(@Param('searchParam') searchParam: string) {
    console.log('entro');
    return this.gifsService.getGifs(searchParam);
  }

  @Get('/specificGif/:gifId')
  getGif(@Param('gifId') gifId: string) {
    return this.gifsService.getGif(gifId);
  }
}
