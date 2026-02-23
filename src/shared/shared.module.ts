import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthAndRolesGuard } from './guards/auth.guard';
import { PitchRepository } from './repositories/pitch.repository';

@Global()
@Module({
  imports: [PassportModule],
  providers: [UserRepository, PitchRepository, JwtStrategy, AuthAndRolesGuard],
  exports: [UserRepository, PitchRepository, AuthAndRolesGuard],
})
export class SharedModule {}
