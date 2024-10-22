import { IsInt, IsString, Matches } from 'class-validator';

export class ValidateMoveDto {
  @IsInt()
  gameId: number;

  @IsInt()
  pieceId: number;

  @IsString()
  @Matches(/^[A-H][1-8]$/, { message: 'newPosition must be a valid chess position (e.g., "E2", "A4")' })
  newPosition: string;
}