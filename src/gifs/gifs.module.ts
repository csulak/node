import { HttpModule, Module } from '@nestjs/common';
import { GifsService } from './gifs.service';
import { GifsController } from './gifs.controller';

@Module({
  imports: [HttpModule],
  controllers: [GifsController],
  providers: [GifsService],
  exports: [HttpModule],
})
export class GifsModule {}
