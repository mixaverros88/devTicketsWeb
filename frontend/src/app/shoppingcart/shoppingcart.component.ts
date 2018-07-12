import { Component, OnInit } from '@angular/core';
import {
  ConfigService,
  CartService

} from '../service';



@Component({


  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  data: any [];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
  // tslint:disable-next-line:no-shadowed-variable
  private ConfigService: ConfigService) {
  }


z
  ngOnInit() {
 this.data = this.CartService.getCartProducts();
  }

  deleteFromCart(id: number ) {
this.CartService.deletefromCart(id);
console.log(this.CartService.getCart());
this.ngOnInit();
  }

  getRawValue() {
    return Math.ceil(this.CartService.cartValue());
  }

  getTax() {
    const final = (((this.CartService.cartValue()) * 5) / 100) ;
    return Math.round(final * 100) / 100;
  }

  getCartValue() {
    let final = this.CartService.cartValue();
    final = final + this.getTax();
    final = final + 5;
    return Math.ceil(final);
  }

  clearCart() {
this.CartService.clearCart();
this.ngOnInit();
console.log('Cart Cleared Succesfully');
  }

  checkout(id: number) {

    this.CartService.checkout(id);
  }

}
