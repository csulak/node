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
import { PokemonsController } from './pokemons/pokemons.controller';
import { PokemonsService } from './pokemons/pokemons.service';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(), GifsModule, PokemonsModule],
  controllers: [
    AppController,
    TasksController,
    GifsController,
    PokemonsController,
  ],
  providers: [AppService, TasksService, GifsService, PokemonsService],
})
export class AppModule {}
