import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PitchRepository } from 'src/shared/repositories/pitch.repository';
import { BookingRepository } from 'src/shared/repositories/booking.repository';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly pitchRepository: PitchRepository,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: string) {
    const { pitchId, startTime, endTime } = createBookingDto;
    const start = new Date(startTime);
    const end = new Date(endTime);

    // 1. Kiểm tra thời gian hợp lệ (phải đặt trước ít nhất 30p, kết thúc > bắt đầu)
    if (start >= end || start < new Date()) {
      throw new BadRequestException(
        'The booking time for the court is invalid',
      );
    }

    // 2. Tìm sân bóng
    const pitch = await this.pitchRepository.findById(pitchId);
    if (!pitch)
      throw new NotFoundException('The football field does not exist');

    // 3. KIỂM TRA TRÙNG LỊCH (Critical Section)
    const isOverlapped = await this.bookingRepository.checkOverlap(
      pitchId,
      start,
      end,
    );
    if (isOverlapped) {
      throw new BadRequestException(
        'Someone has already booked the field for this time slot!',
      );
    }

    // 4. Tính tiền (Ví dụ: giá theo giờ * số giờ)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const totalPrice = pitch.pricePerHour * hours;

    // 5. Tạo booking
    const booking = this.bookingRepository.create({
      startTime: start,
      endTime: end,
      totalPrice,
      user: { id: userId } as any,
      pitch,
    });

    return await this.bookingRepository.save(booking);
  }
}
