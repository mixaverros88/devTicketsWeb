import { CustomCounterComponent } from './../custom-counter/custom-counter.component';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ScrollEvent } from 'ngx-scroll-event';
import {
  TicketService,
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

  // PAGINATION VALUES
  totalPages;
  last: boolean;
  totalElements: number;
  size = 3;
  number = 0;
  sort = 'desc';
  first: boolean;
  numberOfElements: number;
  orderByColumn: String = 'id';
  engTicket = false;
  // PAGINATION VALUES

  counterValue = 0;
  data: any[];

  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    private router: Router,
    config: NgbRatingConfig) {
    config.max = 5;
  }

  public handleScroll(event: ScrollEvent) {
    if (event.isReachingBottom) {

      if (!this.engTicket) {
        this.size += 3;
        this.getProducts();
        if (this.size >= this.totalElements) { this.engTicket = true; }
      }
    }
  }

  ngOnInit() {
    this.getProducts();

  }

setQuantityofProduct(id: number) {
  return this.CartService.getNumberinCart(id);
}


goToProductDetails(id) {
    this.router.navigate(['/productpage', id]);
  }

  addtoCart(id: number) {
    return this.CartService.addtoCart(id);

  }



  getProducts() {
    this.TicketService.getAlladminPage(this.number, this.size, this.sort, this.orderByColumn)
      .subscribe(
        (data: any[]) => {
          if (data['content']) {
            this.data = data['content'];
          }

          this.totalPages = data['totalPages'];
          this.last = data['last'];
          this.totalElements = data['totalElements'];
          this.size = data['size'];
          this.number = data['number'];
          this.first = data['first'];
          this.numberOfElements = data['numberOfElements'];
        }
      );


  }



}
