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
import { PokemonsController } from './pokemons/pokemons.controller';
import { PokemonsService } from './pokemons/pokemons.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/node-nest1'),
    ConfigModule.forRoot(),
    GifsModule,
    PokemonsModule,
    AuthModule,
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
