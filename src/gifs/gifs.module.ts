import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { GifsService } from './gifs.service';
import { GifsController } from './gifs.controller';

@Module({
  /** Adding Mem cache on gifs */
  imports: [HttpModule, CacheModule.register({})],
  controllers: [GifsController],
  providers: [GifsService],
  exports: [HttpModule, CacheModule],
})
export class GifsModule {}
