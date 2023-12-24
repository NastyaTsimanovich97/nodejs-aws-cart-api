import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CartStatuses } from '../models';
import { CartItemEntity } from './cartItem.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column()
  user_id: string;

  @Column()
  status: CartStatuses;

  @OneToMany(() => CartItemEntity, (items) => items.cart_id)
  items: CartItemEntity[];
}
