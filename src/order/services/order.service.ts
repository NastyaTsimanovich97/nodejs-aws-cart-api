import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  async findById(orderId: string): Promise<OrderEntity> {
    return this.ordersRepository.findOneBy({ id: orderId });
  }

  async create(data: any): Promise<OrderEntity> {
    return this.ordersRepository.save(data);
  }

  async update(orderId, data): Promise<OrderEntity> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    return this.ordersRepository.save({...order, ...data});    
  }
}
