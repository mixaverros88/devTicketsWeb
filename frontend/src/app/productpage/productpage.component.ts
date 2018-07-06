
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {
  ConfigService,
  UserService,
  TicketService,
  ApiService,
  CartService
} from '../service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})

@Injectable()
export class ProductpageComponent implements OnInit {
  counterValue = 0;
  data: any [];

  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    private CartService: CartService) { }

  ngOnInit() {
    this.getProducts();
  }

  addtoCart(id: number) {
    return this.CartService.addtoCart(id);

          }
  
  getProducts() {

    this.TicketService.getAll()
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.data = data;
         console.log(data);
       }
      }
    );
  }
  

}
