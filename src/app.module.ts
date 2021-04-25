import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { GifsController } from './gifs/gifs.controller';
import { GifsService } from './gifs/gifs.service';
import { GifsModule } from './gifs/gifs.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsController } from './pokemons/pokemons.controller';
import { PokemonsService } from './pokemons/pokemons.service';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/node-nest1'),
    GifsModule,
    PokemonsModule,
  ],
  controllers: [
    AppController,
    TasksController,
    GifsController,
    PokemonsController,
  ],
  providers: [AppService, TasksService, GifsService, PokemonsService],
})
export class AppModule {}
