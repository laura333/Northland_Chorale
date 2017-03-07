import { Product } from '../products/product';

export interface CartEntity {
  quantity: number;
  product: Product;
}
