import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Pitch } from '../../pitches/entities/pitch.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class PitchRepository extends BaseRepository<Pitch> {
  constructor(private dataSource: DataSource) {
    super(Pitch, dataSource.createEntityManager());
  }

  async findByAddress(address: string): Promise<Pitch[]> {
    return this.createQueryBuilder('pitch')
      .where('pitch.address ILIKE :address', { address: `%${address}%` })
      .getMany();
  }
}
