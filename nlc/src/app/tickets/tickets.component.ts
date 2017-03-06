import { Component, OnInit, Renderer } from '@angular/core';
import { Product } from './products/product';
import { CartEntity } from './cart/cart.entity';
import { ProductService } from './products/product.service';
import { CartService } from './cart/cart.service';

@Component({
  // moduleId: module.id,
  selector: 'tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: [ProductService, CartService]
})

export class TicketsComponent implements OnInit {

  selectedProduct: Product;
  products: Product[];
  visableProducts: Product[];
  product: Product;
  filterVal = "";

  constructor(private renderer: Renderer, private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  fiter(): void {
    this.visableProducts = this.products.filter(product => product.description.toLowerCase().includes(this.filterVal.toLowerCase()));
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  appendItem(product: Product): void {
    // get the cart entry for the product
    this.cartService.getCartEntryByProductId(product.id).then(function(cartEntry: CartEntity) {

      // if product quantity hasn't been exeeded
      if (this.checkIfCapacityIsExeeded(cartEntry)) {
        this.cartService.addProductToCart(product);
        this.router.navigate(['cart']);
      } else {
        // TODO: change this one to a modal later on, if needed
        alert("We are sold out of tickets. You currently have " + cartEntry.quantity + " of tickets in your cart. We have these dates available " + cartEntry.product.capacity);
      }

    }.bind(this));

  }

  checkIfCapacityIsExeeded(cartEntry: CartEntity): boolean {
    return cartEntry == undefined || (cartEntry.quantity + 1 <= cartEntry.product.capacity)
  }

  // getProducts(): void {
  //   this.productService.getProducts().then(products => this.products = products);
  // }

  getProducts(): void {
    this.productService.getProducts().then(function(result) {
      this.products = result;
      this.visibleProducts = result;
    }.bind(this), function(err) {
      alert("Oops. Something went wrong while fetching the tickets.");
    });
  }
}
