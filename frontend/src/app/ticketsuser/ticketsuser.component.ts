import { CustomCounterComponent } from './../custom-counter/custom-counter.component';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {
  ConfigService,
  UserService,
  TicketService,
  ApiService,
  CartService
} from '../service';
import { Router } from '@angular/router';

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
  private CartService: CartService ,
  private router: Router,
  config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit() {

    this.getProducts();

  }

  goToProductDetails(id) {
    this.router.navigate(['/productpage', id]);
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
