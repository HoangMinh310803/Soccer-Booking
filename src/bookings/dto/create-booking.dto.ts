import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  pitchId: string;

  @IsDateString()
  startTime: string; // ISO String gửi từ FE

  @IsDateString()
  endTime: string;
}
