import { Module } from '@nestjs/common';
import { PitchesService } from './pitches.service';
import { PitchesController } from './pitches.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Pitch } from './entities/pitch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pitch])],
  controllers: [PitchesController],
  providers: [PitchesService],
})
export class PitchesModule {}
