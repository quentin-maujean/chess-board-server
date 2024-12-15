import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { ValidateMoveDto } from './dto/validate-move.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/api/game/move')
  @UseGuards(AuthGuard)
  async validateAndExecuteMove(@Body() validateMoveDto: ValidateMoveDto) {
    try {
      const { gameId, pieceId, newPosition } = validateMoveDto;
      const response = await this.gameService.updateGameState(gameId, pieceId, '', newPosition);
      return response;
    } catch (error) {
      let status = 500;
      let message = error.message;

      if (message.includes('Game not found') || message.includes('Invalid board position') || message.includes('Move would put your own king in check')) {
        status = 422;
      } else if (message.includes('Piece not found or does not belong to the current player')) {
        status = 403;
      } else if (message.includes('Game not found or is not active')) {
        status = 400;
      }

      return {
        statusCode: status,
        message: message,
      };
    }
  }
}