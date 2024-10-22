import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Piece } from './piece.entity';

@Entity()
export class Move {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  from_position: string;

  @Column({ type: 'varchar' })
  to_position: string;

  @Column({ type: 'boolean' })
  is_valid: boolean;

  @Column({ type: 'timestamp' })
  move_time: Date;

  @ManyToOne(() => Piece, (piece) => piece.moves)
  @Column()
  piece_id: number;
}