import { Component, OnInit, Injectable } from '@angular/core';
import { Tickets } from './tickets';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ConfigService,
  UserService,
  TicketService
} from '../service';





@Component({
  selector: 'app-tickets-crud',
  templateUrl: './tickets-crud.component.html',
  styleUrls: ['./tickets-crud.component.css']
})


@Injectable()
export class TicketsCrudComponent implements OnInit {

  id: number;
  name: string ;
  language: string;
  available: number;
  price: number;
  location: string;
  found: boolean;
  data: any [];
  message: string;
  ticket: Tickets;

  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService) {

  }

  ngOnInit() {

      this.getProducts();

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
// tslint:disable-next-line:eofline
}