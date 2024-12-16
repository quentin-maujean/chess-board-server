import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Player } from './players';
import { Move } from './moves';

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