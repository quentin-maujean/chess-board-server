import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Player } from './player';

@Entity()
export class Piece {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  position: string;

  @ManyToOne(() => Player, player => player.pieces)
  player: Player;
}