import { IsInt, IsString, Matches } from 'class-validator';

export class ValidateMoveDto {
  @IsInt()
  gameId: number;

  @IsInt()
  pieceId: number;

  @IsString()
  @Matches(/^[A-H][1-8]$/, { message: 'Invalid board position.' })
  newPosition: string;
}