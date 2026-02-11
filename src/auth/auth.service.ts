import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import {
  LoginResponse,
  UserResponse,
} from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Trả về một Promise chứa UserResponse
  async register(registerDto: RegisterDto): Promise<UserResponse> {
    const user = await this.usersService.create(registerDto);
    const { password, ...result } = user;
    return result;
  }
  // Logic Đăng nhập
  async login(phone: string, pass: string): Promise<LoginResponse> {
    const user = await this.usersService.findByPhone(phone);

    if (!user) {
      throw new UnauthorizedException('phone and password do not match');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('phone and password do not match');
    }

    const payload = { sub: user.id, phone: user.phone, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    };
  }
}
