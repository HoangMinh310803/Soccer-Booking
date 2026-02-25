import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Pitch } from '../../pitches/entities/pitch.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ default: 'PENDING' }) // PENDING, CONFIRMED, CANCELLED
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Pitch, (pitch) => pitch.bookings)
  pitch: Pitch;
}
