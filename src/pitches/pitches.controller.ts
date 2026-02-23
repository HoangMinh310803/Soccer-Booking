import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PitchesService } from './pitches.service';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { AuthAndRolesGuard } from '../shared/guards/auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('pitches')
@UseGuards(AuthAndRolesGuard) // Áp dụng guard tổng hợp
export class PitchesController {
  constructor(private readonly pitchesService: PitchesService) {}

  @Post()
  @Roles('OWNER', 'ADMIN') // Chỉ chủ sân và admin mới được tạo
  create(@Body() createPitchDto: CreatePitchDto) {
    return this.pitchesService.create(createPitchDto);
  }

  @Get()
  @Roles('USER', 'OWNER', 'ADMIN') // Mọi người đều có thể xem danh sách sân
  findAll() {
    return this.pitchesService.findAll();
  }

  @Get(':id')
  @Roles('USER', 'OWNER', 'ADMIN')
  findOne(@Param('id') id: string) {
    return this.pitchesService.findOne(id);
  }

  @Delete(':id')
  @Roles('OWNER', 'ADMIN')
  remove(@Param('id') id: string) {
    return this.pitchesService.remove(id);
  }
}
