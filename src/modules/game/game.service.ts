import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../../entities/game.entity';
import { Piece } from 'src/entities/pieces';
import { Move } from 'src/entities/moves';
import { Player } from '../../entities/player.entity'; // Assuming Player entity is in the same directory

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
    @InjectRepository(Piece)
    private readonly pieceRepository: Repository<Piece>,
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>,
  ) {}

  async createGameState(playerId: string): Promise<{ message: string; newGame: Game }> {
    try {
      const currentUser = { playerId }
      const game = await this.gameRepository.create();
      if (!game) {
        throw new BadRequestException('Game not found or is not active.');
      }

      game.isActive = true;

      // Verify that the "pieceId" exists and belongs to the current player
      
      return {
        message: 'Move executed successfully',
        newGame: game
      };
    } catch (error) {
      throw new Error(`Failed to update game state: ${error.message}`);
    }
  }

  async updateGameState(gameId: number, pieceId: number, fromPosition: string, toPosition: string, playerId: string): Promise<{ message: string; newBoardState: Record<number, string> }> {
    try {
      const currentUser = { playerId }
      // Comment
      const game = await this.gameRepository.findOne(gameId);
      if (!game || !game.isActive) {
        throw new BadRequestException('Game not found or is not active.');
      }

      // Verify that the "pieceId" exists and belongs to the current player
      const piece = await this.pieceRepository.findOne({
        where: { id: pieceId, player: currentUser },
        relations: ['player'],
      });
      if (!piece) {
        throw new BadRequestException('Piece not found or does not belong to the current player.');
      }

      // Validate that the "newPosition" is a valid board position according to the game rules
      // Placeholder for actual game rules validation
      // Ensure that the move does not result in the player's own king being in check
      // Placeholder for check validation

      // Update the position of the piece identified by "pieceId" in the "pieces" table to "toPosition"
      await this.pieceRepository.update(pieceId, { position: toPosition });

      // Insert a new record into the "moves" table
      const move = this.moveRepository.create({
        piece_id: pieceId,
        from_position: fromPosition,
        to_position: toPosition,
        is_valid: true, // This should be set based on actual game rules validation
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