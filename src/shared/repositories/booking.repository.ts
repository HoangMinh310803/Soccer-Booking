import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Booking } from 'src/bookings/entities/booking.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class BookingRepository extends BaseRepository<Booking> {
  constructor(private dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }

  async checkOverlap(
    pitchId: string,
    start: Date,
    end: Date,
  ): Promise<boolean> {
    const overlap = await this.createQueryBuilder('booking')
      .where('booking.pitchId = :pitchId', { pitchId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: ['CONFIRMED', 'PENDING'],
      })
      .andWhere('(booking.startTime < :end AND booking.endTime > :start)', {
        start,
        end,
      })
      .getOne();

    return !!overlap; // Trả về true nếu có trùng lặp
  }
}
