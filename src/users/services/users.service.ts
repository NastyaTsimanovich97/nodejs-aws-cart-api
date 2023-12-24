import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(userId: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  async createOne({ name, password, email }: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save({ name, password, email });
  }

}
