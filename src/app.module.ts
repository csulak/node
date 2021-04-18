import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GifsController } from './gifs/gifs.controller';
import { GifsService } from './gifs/gifs.service';
import { GifsModule } from './gifs/gifs.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(), GifsModule],
  controllers: [AppController, TasksController, GifsController],
  providers: [AppService, TasksService, GifsService],
})
export class AppModule {}
