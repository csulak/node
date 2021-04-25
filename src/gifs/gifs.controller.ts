import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GifsService } from './gifs.service';
import { Gif } from './model/Gif';

@ApiTags('gifs')
@ApiSecurity('X-API-KEY')
@Controller('gifs')
export class GifsController {
  constructor(private gifsService: GifsService) {}

  /** Adding Mem Cache on this endpoint */
  // If I set the cache key here, for 20 secs (TTL) every search (with different parameters) is going to return the same info.
  //@CacheKey('GIFS')
  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Return Gifs list',
    description:
      'You must to send a string name. That is going to be the related gif returned',
  })
  @UseGuards(AuthGuard('api-key'))
  @Get(':searchParam')
  getGifs(@Param('searchParam') searchParam: string) {
    console.log('this call is going to be mem cached');
    console.log('searchings gifs by param: ', searchParam);
    return this.gifsService.getGifs(searchParam);
  }

  @CacheTTL(20)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Return info related for the gif-id specified',
  })
  @Get('/specificGif/:gifId')
  getGif(@Param('gifId') gifId: string): Promise<Observable<Gif>> {
    console.log('this call is going to be mem cached');
    console.log('retrieving info by Gif Id:', gifId);
    return this.gifsService.getGif(gifId);
  }
}
