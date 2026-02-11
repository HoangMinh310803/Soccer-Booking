import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../shared/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { phone, password, name } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { phone },
    });
    if (existingUser) {
      throw new ConflictException('phone number already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      phone,
      name,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async findByPhone(phone: string): Promise<User | null> {
    return await this.userRepository.findByPhone(phone);
  }
}
