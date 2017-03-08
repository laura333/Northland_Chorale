import { Injectable } from '@angular/core';

import { Product } from '../products/product';
import { PRODUCTS } from '../products/inventory';
import { CartEntity } from './cart.entity';

@Injectable()
export class CartService {

  private storage = localStorage;

  constructor() {
    this.initCart();
  }

  initCart() {
    // if no cart history, create an empty cart
    if (!this.storage.getItem('cart')) {
    let emptyMap: { [key: string]: number; } = {};
      this.setCart(emptyMap);
    }
  }

  saveListOfCartEntities(listOfCartEntries: CartEntity[]) {
    // reduce all the entities to a map
    let cartMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
      map[cartEntry.product.id] = cartEntry;
      return map;
    }, {});
    // persist the map
    this.setCart(cartMap);
  }
  /**
  * Return all the products in the cart from local storage
  *
  **/
  getAllCartEntities() {
    // get cart
    let myCartMap = this.getCart();
    let cartEntities: CartEntity[] = [];
    // convert the map to an array
    for (let key in myCartMap) {
      let value = myCartMap[key];
      cartEntities.push(value);
    }
    // return the array
    return Promise.resolve(cartEntities);
  }
  /**
  * Returns a specific cart entry from the cartEntry map
  **/
  getCartEntryByProductId(productId) {
    let myCartMap = this.getCart();
    console.log(myCartMap);
    return Promise.resolve(myCartMap[productId]);
  };
  /**
  * Will persist the product to local storage
  *
  **/
  addProductToCart(product: Product): void {
    // product id , quantity
    let cartMap = this.getCart();
    // if current key exists in map, append value
    if (cartMap[product.id] != undefined) {
      let cartInstance = cartMap[product.id];
      cartInstance.quantity++;
      cartMap[product.id] = cartInstance;
    } else {
      // if not, set default value
      cartMap[product.id] = {
        'product': product,
        'quantity': 1
      }
    }
    // save the map
    this.setCart(cartMap);
  }

  /**
  * Retrive the cart from local storage
  **/
  private getCart() {
    let cartAsString = this.storage.getItem('cart');
    return JSON.parse(cartAsString);
  }
  /**
  * Persist cart to local storage
  **/
  private setCart(cartMap): void {
    this.storage.setItem('cart', JSON.stringify(cartMap));
  }

  clearTheCart() {
    this.storage.clear();
  }
}
