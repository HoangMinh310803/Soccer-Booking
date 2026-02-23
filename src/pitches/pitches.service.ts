import { Injectable, NotFoundException } from '@nestjs/common';
import { PitchRepository } from '../shared/repositories/pitch.repository';
import { CreatePitchDto } from './dto/create-pitch.dto';

@Injectable()
export class PitchesService {
  constructor(private readonly pitchRepository: PitchRepository) {}

  async create(createPitchDto: CreatePitchDto) {
    const newPitch = this.pitchRepository.create(createPitchDto);
    return await this.pitchRepository.save(newPitch);
  }

  async findAll() {
    return await this.pitchRepository.find();
  }

  async findOne(id: string) {
    const pitch = await this.pitchRepository.findById(id);
    if (!pitch) throw new NotFoundException('not found pitch');
    return pitch;
  }

  async remove(id: string) {
    const pitch = await this.findOne(id);
    return await this.pitchRepository.remove(pitch);
  }
}
