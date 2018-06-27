import { CustomCounterComponent } from './../custom-counter/custom-counter.component';
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
  selector: 'app-ticketsuser',
  templateUrl: './ticketsuser.component.html',
  styleUrls: ['./ticketsuser.component.css']
})

@Injectable()
export class TicketsuserComponent implements OnInit {

  counterValue = 0;
  data: any [];

  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
  // tslint:disable-next-line:no-shadowed-variable
  private CartService: CartService) { }

  ngOnInit() {
<<<<<<< HEAD
    this.getProducts();
=======

    this.getProducts();

>>>>>>> 3a4873e1631794b80b8c185df9fdcf05a568cb2e
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
