import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { CartService } from './cart.service';
import {CartEntity} from './cart.entity';
import { SumPipe } from './sum.pipe';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartEntities: CartEntity[];
  totalSum: number;

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.cartService.getAllCartEntities().then(function(result) {
      this.cartEntities = result;
      this.calcMax();
    }.bind(this), function(err) {
      alert("Oops. Something went wrong while fetching the tickets.");
    });
  }

  removeByProductId(productId: number) {
    // Filter out all cartEntities with given productId
    this.cartEntities = this.cartEntities.filter(entry => entry.product.id != productId);

    // recalculate max value
    this.calcMax();

    //save to localStorage
    this.cartService.saveListOfCartEntities(this.cartEntities);
  }

  changeQuantity(productId: number, valueChange: number) {
    // find the CartEntity and perform the action
    let cartEntry = this.cartEntities.find(entry => entry.product.id === productId);

    let newValue = cartEntry.quantity + valueChange;

    console.log(newValue, cartEntry.product.capacity);
    // verify that user won't do an action that is not permited like reduce to 0 or over max capacity
    if (newValue > 0 && newValue <= cartEntry.product.capacity) {
      // set the new value
      cartEntry.quantity = newValue;
      // calculate a new max value
      this.calcMax();
      // save to localStorage
      this.cartService.saveListOfCartEntities(this.cartEntities);
    }
  }

  calcMax() {
    let totalSum = 0;
    this.cartEntities.forEach(function(entity) {
      totalSum += entity.quantity * entity.product.price;
    });
    this.totalSum = totalSum;
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_MlnEwz9cJz5t78rk5wT4eS4v',
      image: "https://s3.amazonaws.com/stripe-uploads/acct_19q721CW6OOcqpDhmerchant-icon-1487890697833-note.png",
      locale: 'auto',
      token: function(token: any) {

        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Northland Chorale',
      description: 'tickets to "30 Years of Broadway"',
      amount: this.totalSum * 100
    });
  }

}
