import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PitchesService } from './pitches.service';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { UpdatePitchDto } from './dto/update-pitch.dto';

@Controller('pitches')
export class PitchesController {
  constructor(private readonly pitchesService: PitchesService) {}

  @Post()
  create(@Body() createPitchDto: CreatePitchDto) {
    return this.pitchesService.create(createPitchDto);
  }

  @Get()
  findAll() {
    return this.pitchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pitchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePitchDto: UpdatePitchDto) {
    return this.pitchesService.update(+id, updatePitchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pitchesService.remove(+id);
  }
}
