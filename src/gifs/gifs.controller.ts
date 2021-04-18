import { Controller, Get, Param } from '@nestjs/common';
import { GifsService } from './gifs.service';

@Controller('gifs')
export class GifsController {
  constructor(private gifsService: GifsService) {}

  @Get(':searchParam')
  getGifs(@Param('searchParam') searchParam: string) {
    return this.gifsService.getGifs(searchParam);
  }

  @Get('/specificGif/:gifId')
  getGif(@Param('gifId') gifId: string) {
    return this.gifsService.getGif(gifId);
  }
}
