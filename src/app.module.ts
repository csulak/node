import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { GifsController } from './gifs/gifs.controller';
import { GifsService } from './gifs/gifs.service';
import { GifsModule } from './gifs/gifs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/node-nest1'),
    GifsModule,
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, GifsService],
})
export class AppModule {}
