import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Return "Hello World!"',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Clear all Mem and Redis cache',
  })
  @Post('/clear/every/caches')
  async clearEveryCaches() {
    return await this.appService.clearEveryCaches();
  }
}
