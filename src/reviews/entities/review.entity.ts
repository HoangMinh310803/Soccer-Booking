import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Pitch } from '../../pitches/entities/pitch.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  rating: number; // 1 đến 5 sao

  @Column({ type: 'text', nullable: true })
  comment: string;

  // Người viết đánh giá
  @ManyToOne(() => User)
  author: User;

  // Trường hợp 1: Đánh giá sân bóng
  @ManyToOne(() => Pitch, (pitch) => pitch.reviews, { nullable: true })
  pitch: Pitch;

  // Trường hợp 2: Đánh giá người chơi khác
  @ManyToOne(() => User, { nullable: true })
  targetUser: User;

  @CreateDateColumn()
  createdAt: Date;
}
