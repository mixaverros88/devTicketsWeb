import { Component, OnInit, Injectable } from '@angular/core';
import { Tickets } from './tickets';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ConfigService,
  UserService,
  TicketService,
  ApiService
} from '../service';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';





@Component({
  selector: 'app-tickets-crud',
  templateUrl: './tickets-crud.component.html',
  styleUrls: ['./tickets-crud.component.css']
})


@Injectable()
export class TicketsCrudComponent implements OnInit {

  checkinTemp: any;
  notification: any;
  submitted: boolean;
  authService: any;
  form: any;
  router: any;
  http: any;
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




onDelete(id: number) {
  /**
   * Innocent until proven guilty
   */
  this.notification = undefined;
  this.submitted = true;

  this.TicketService.deleteEmployee(id)
  // show me the animation
  .subscribe(() => {
   this.data.splice(id);

  }, error => {
    console.log('mpike');
   let index = 0;
    for ( let i = 0; i < this.data.length; i++) {

if (this.data[i].id === id) {

  index = i;
}

    }
    console.log("to index einai "+ index);
    this.data.splice(index, 1);
  });

}

}
