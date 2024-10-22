import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/players';
import { Piece } from 'src/entities/pieces';
import { Move } from 'src/entities/moves';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Piece, Move])],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}