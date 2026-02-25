import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthAndRolesGuard } from 'src/shared/guards/auth.guard';

@Controller('bookings')
@UseGuards(AuthAndRolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('USER', 'OWNER')
  create(@Body() createBookingDto: CreateBookingDto, @Req() req: any) {
    return this.bookingsService.create(createBookingDto, req.user.userId);
  }
}
