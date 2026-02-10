import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string; // "Tìm đối cứng đá kèo chia tiền sân"

  @Column()
  skillLevel: string; // "Cơ bản", "Trung bình", "Khá", "Phủi"

  @Column({ default: 0 })
  missingPlayers: number; // Số người còn thiếu

  @Column({ default: 'OPEN' }) // OPEN, FULL, CANCELLED
  status: string;

  // Người tạo kèo (Chủ kèo)
  @ManyToOne(() => User)
  creator: User;

  // Liên kết với một lượt đặt sân cụ thể để lấy thời gian và địa điểm
  @ManyToOne(() => Booking)
  booking: Booking;

  // Danh sách những người tham gia kèo này (Mối quan hệ Nhiều-Nhiều)
  @ManyToMany(() => User)
  @JoinTable({ name: 'match_participants' })
  participants: User[];

  @CreateDateColumn()
  createdAt: Date;
}
