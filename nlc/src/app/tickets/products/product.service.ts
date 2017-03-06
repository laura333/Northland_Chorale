import { Injectable } from '@angular/core';

// import { Product } from './product';
import { PRODUCTS } from './inventory';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts() {
    return Promise.resolve(PRODUCTS);
  }
}
