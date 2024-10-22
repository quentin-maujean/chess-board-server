import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from 'src/entities/game';
import { Piece } from 'src/entities/pieces';
import { Move } from 'src/entities/moves';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Piece)
    private readonly pieceRepository: Repository<Piece>,
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>,
  ) {}

  async updateGameState(gameId: number, pieceId: number, fromPosition: string, toPosition: string): Promise<{ message: string; newBoardState: Record<number, string> }> {
    try {
      // Retrieve the current game state using "gameId"
      const game = await this.gameRepository.findOneBy({ id: gameId });
      if (!game) {
        throw new Error('Game not found');
      }

      // Update the position of the piece identified by "pieceId" in the "pieces" table to "toPosition"
      await this.pieceRepository.update(pieceId, { position: toPosition });

      // Insert a new record into the "moves" table
      const move = this.moveRepository.create({
        piece_id: pieceId,
        from_position: fromPosition,
        to_position: toPosition,
        is_valid: true,
        move_time: new Date(),
      });
      await this.moveRepository.save(move);

      // Check for any special conditions such as check, checkmate, or stalemate and update the game state accordingly
      // This is a placeholder for additional game logic
      // ...

      // Save the updated game state
      // This is a placeholder for saving the game state
      // ...

      // If the move concludes the game, update the game status
      // This is a placeholder for concluding the game
      // ...

      // Return a response object
      return {
        message: 'Move executed successfully',
        newBoardState: { [pieceId]: toPosition },
      };
    } catch (error) {
      throw new Error(`Failed to update game state: ${error.message}`);
    }
  }
}