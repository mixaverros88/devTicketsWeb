import {Cart} from './../shoppingcart/Cart';
import {CartItem} from './../shoppingcart/CartItem';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ConfigService,
  UserService,
  ApiService,
  CartService

} from '../service';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Ticket } from '../tickets-crud/ticket';


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



  ngOnInit() {
 this.data = this.CartService.getCartProducts();
  }

  deleteFromCart(id: number ){
this.CartService.deletefromCart(id);
console.log(this.CartService.getCart());
this.ngOnInit();
  }

  getRawValue(){
    return this.CartService.cartValue();
  }

  getTax(){
    const final =(((this.CartService.cartValue()) *5) / 100) ;
return final;
  }

  getCartValue(){
  let final = this.CartService.cartValue();
  final = final + this.getTax();
  final = final + 5;
    return final;
  }

  clearCart() {
this.CartService.clearCart();
this.ngOnInit();
console.log('Cart Cleared Succesfully');
  }

}
