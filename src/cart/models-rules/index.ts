import { CartEntity } from '../entities/cart.entity';
import { CartItemEntity } from '../entities/cartItem.entity';

/**
 * @param {CartEntity} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: CartEntity): number {
  const price = 1;
  return cart ? cart.items.reduce((acc: number, { count }: CartItemEntity) => {
    return acc += price * count;
  }, 0) : 0;
}
