import { CartItem } from '../shoppingcart/CartItem';

export interface Cart {
    id: number ;
    cart: CartItem[];
  totalPrice: number;
}
