import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';

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
  @ApiSecurity('X-API-KEY')
  @UseGuards(AuthGuard('api-key'))
  @Post('/clear/every/caches')
  async clearEveryCaches() {
    return await this.appService.clearEveryCaches();
  }
}
