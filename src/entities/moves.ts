import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Piece } from './pieces';

@Entity()
export class Move {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Piece, (piece) => piece.moves)
  piece: Piece;

  @Column({ type: 'varchar' })
  from_position: string;

  @Column({ type: 'varchar' })
  to_position: string;

  @Column({ type: 'timestamp' })
  move_time: Date;
}