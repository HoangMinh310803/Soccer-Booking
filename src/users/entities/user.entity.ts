import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  name: string;

  @Column({ select: false }) // Bảo mật: không hiện password khi query
  password: string;

  @Column({ default: 'USER' }) // USER, OWNER, ADMIN
  role: string;

  @Column({ type: 'float', default: 5.0 }) // Điểm uy tín/trình độ
  rating: number;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;
}
