import { Injectable } from '@nestjs/common';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { UpdatePitchDto } from './dto/update-pitch.dto';

@Injectable()
export class PitchesService {
  create(createPitchDto: CreatePitchDto) {
    return 'This action adds a new pitch';
  }

  findAll() {
    return `This action returns all pitches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pitch`;
  }

  update(id: number, updatePitchDto: UpdatePitchDto) {
    return `This action updates a #${id} pitch`;
  }

  remove(id: number) {
    return `This action removes a #${id} pitch`;
  }
}
