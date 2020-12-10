import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:GuU5rx8XFoLlOI8G@cluster0.cegym.mongodb.net/football-meeting?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
