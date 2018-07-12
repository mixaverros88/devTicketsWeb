import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../shoppingcart/Cart';
import { trigger } from '@angular/core/src/animation/dsl';

@Injectable()
export class OrdersService {

    constructor(
        private apiService: ApiService,
        private config: ConfigService,


    ) { }

    makeCart(x: any): Cart {
        let carter: Cart;
        carter = x;
        localStorage.setItem('cart', JSON.stringify(carter));
        return carter;
    }

    getOrders(id: number) {

        return this.apiService.get(this.config.myOrders_url(id));
    }

    viewOrder(id: number) {

        return this.apiService.get(this.config.getOrder(id));
    }

    numberofAllOrders() {
        return this.apiService.get(this.config.getNumberOforders());
    }


};
