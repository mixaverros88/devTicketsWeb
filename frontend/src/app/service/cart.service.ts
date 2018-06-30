import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../shoppingcart/Cart';
import { CartItem } from '../shoppingcart/CartItem';
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
        let cart = {} as Cart;

        if (this.getCart() != null) {
            console.log('den einai adeio');
            cart = this.getCart();
        }

        const addProductHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });


        this.apiService.post(this.config.editteticket1_url(id), cart, addProductHeaders)
            .subscribe(
                res => this.makeCart(res));
    }


    deletefromCart(id: number) {

        let cart = {} as Cart;

        if (this.getCart() != null) {
            console.log('den einai adeio');
            cart = this.getCart();
        }

        const addProductHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    this.apiService.post(this.config.deletefromCart_url(id), cart , addProductHeaders).subscribe(
        res => this.makeCart(res));
    }

    makeCart(x: any): Cart {
        let carter: Cart;
        carter = x;
        console.log(carter);
        localStorage.setItem('cart', JSON.stringify(carter));
        return carter;
    }

    getCart(): Cart {
        if (localStorage.getItem('cart') != null) {
        return JSON.parse(localStorage.getItem('cart'));
        }
        // tslint:disable-next-line:one-line
        else {

           const cart = {} as Cart;
            cart.totalPrice = 0;
            cart.cart = [];
            return cart;

        }
    }
    getCartinString() {

        if (localStorage.getItem('cart') != null) {
        return (localStorage.getItem('cart'));
        }
        // tslint:disable-next-line:one-line
        else {
            const cart = {} as Cart;
            cart.totalPrice = 0;
            cart.cart = [];
            return JSON.stringify(cart);
        }
    }

    cartValue() {
        const f: Cart = JSON.parse(this.getCartinString());
        if (this.getCartinString() != null) {
        return f.totalPrice;
        }
        // tslint:disable-next-line:one-line
        else {return 0; }
    }
    cartUniqueItems() {
        const f: Cart = JSON.parse(this.getCartinString());
        return f.cart.length;
    }
    cartItems() {
        const f: Cart = JSON.parse(this.getCartinString());
        return f.cart;
    }
    clearCart() {
    localStorage.removeItem('cart');
      }
     getCartProducts(){
        let g =JSON.stringify(this.getCart().cart);
        let carter: CartItem[];
         carter  = JSON.parse(g);
         return carter;
     }
    checkout(id: number) {

        const cart = this.getCart();
        const addProductHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        this.apiService.post(this.config.checkout_url(id), cart, addProductHeaders)
            .subscribe(
              );
    }



};
