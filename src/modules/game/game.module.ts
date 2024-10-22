import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/players';
import { Piece } from 'src/entities/pieces';
import { Move } from 'src/entities/moves';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Piece, Move])],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}