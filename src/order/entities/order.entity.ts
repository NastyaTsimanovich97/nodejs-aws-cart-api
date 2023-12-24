import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CartStatuses } from '../../cart';
import { CartEntity } from '../../cart/entities/cart.entity';

@Entity()
export class OrderEntity {
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

  @Column({ type: 'json', default: {} })
  payment: Record<string, unknown>;

  @Column({ type: 'json', default: {} })
  delivery: Record<string, unknown>;

  @Column()
  total: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn()
  cart_id: CartEntity;
}
