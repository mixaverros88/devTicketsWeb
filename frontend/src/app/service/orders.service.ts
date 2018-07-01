import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../shoppingcart/Cart';
import {Orders} from '../checkout/orders';
import { CartItem } from '../shoppingcart/CartItem';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class OrdersService {

    constructor(
        private apiService: ApiService,
        private config: ConfigService,
        private httpClient: HttpClient,


    ) { }
    // tslint:disable-next-line:member-ordering

    // tslint:disable-next-line:member-ordering




    makeCart(x: any): Cart {
        let carter: Cart;
        carter = x;
        console.log(carter);
        localStorage.setItem('cart', JSON.stringify(carter));
        return carter;
    }

    getOrders(id: number) {

      return this.apiService.get(this.config.myOrders_url(id));
    }

    viewOrder(id: number){

        return this.apiService.get(this.config.getOrder(id));
    }


};
