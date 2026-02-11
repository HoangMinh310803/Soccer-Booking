import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findByPhone(phone: string): Promise<User | null> {
    return await this.findOne({
      where: { phone },
      select: ['id', 'phone', 'password', 'role'],
    });
  }
}
