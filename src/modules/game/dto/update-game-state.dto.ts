import { IsInt, IsString } from 'class-validator';

export class UpdateGameStateDto {
  @IsInt()
  gameId: number;

  @IsInt()
  pieceId: number;

  @IsString()
  fromPosition: string;

  @IsString()
  toPosition: string;
}