import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity('pitches')
export class Pitch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerHour: number;

  @Column({ default: 5 }) // Loại sân: 5, 7, 11
  type: number;

  @OneToMany(() => Booking, (booking) => booking.pitch)
  bookings: Booking[];
  @OneToMany(() => Review, (review) => review.pitch)
  reviews: Review[];
}
