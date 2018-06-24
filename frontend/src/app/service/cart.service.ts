import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../shoppingcart/Cart';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class CartService {

    constructor(
        private apiService: ApiService,
        private config: ConfigService,
        private httpClient: HttpClient,

      ) { }
// tslint:disable-next-line:member-ordering

// tslint:disable-next-line:member-ordering

addtoCart(id: number) {
    // tslint:disable-next-line:member-ordering
let cart = new Cart();
cart.id = 0;
cart.cart = null;
cart.totalprice = 0;


if (this.getCart() != null) {
    console.log('den einai adeio');
    cart = this.getCart();
   }

const addProductHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });


     this.apiService.post(this.config.editteticket1_url(id), cart , addProductHeaders)
   .subscribe(
      res => this.makeCart(res));

    }

    makeCart(x: any): Cart {

        let carter = new Cart();
        carter = x;
        console.log(carter);
        localStorage.setItem('cart', JSON.stringify(carter));
        return carter;


    }

getCart(): Cart {
return JSON.parse(localStorage.getItem('cart'));

    }


    getCartinString() {
        return (localStorage.getItem('cart'));
            }
}