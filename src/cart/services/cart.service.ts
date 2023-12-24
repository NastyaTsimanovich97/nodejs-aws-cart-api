import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CartEntity } from '../entities/cart.entity';

import { CartStatuses } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>,
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    return this.cartsRepository.findOneBy({ user_id: userId });
  }

  async createByUserId(userId: string): Promise<CartEntity> {
    return this.cartsRepository.save({ user_id: userId, status: CartStatuses.OPEN });
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: CartEntity): Promise<CartEntity> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    return this.cartsRepository.save({
      id,
      ...rest,
      items: [ ...items ],
    });
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartsRepository.delete({ user_id: userId });
  }

}
