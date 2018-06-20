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
  
  fooResponse = {};
  whoamIResponse = {};
  allUserResponse = {};
 
  
  id: number;
  name:string ='';
  language:string;
  available: number;
  price: number;
  location: string;
  found: boolean;
  data:any [];
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
       if( data.length ) {
          this.data = data;
         console.log(data);
       }
      }
    );
  }

  getProduct(event) {

    let headers = new HttpHeaders();
    headers  = headers.append('header-1', 'value-1');
    headers  = headers.append('header-2', 'value-2');

    let params = new HttpParams();
    params = params.append('color', event.target.value);
    params = params.append('name', 'mike');

    this.httpClient.get(`http://localhost:8080/api/ticket`,  {headers , params })
    // this.httpClient.get(`http://localhost:555/products/?color=${this.name}`)
    .subscribe(
      (data: any []) => {
       if( data.length ) {
          this.ticket = data[0];
          this.price = data[0].price;
          this.found = true;
          this.ngOnInit();
       }
      }
    );
  }

  postProduct(name: string, language: string, price: number, available: number, location: string): void {
    this.httpClient.post(`http://localhost:555/products/`,
    {
      name: name,
      language: language,
      price: price,
      available: available,
      location: location
    })
    .subscribe(
      (data: any) => {
       console.log(data);
       this.message = 'Επιτυχής Εισαγωγή Προϊόντος';
       this.ngOnInit();
      }
    );
  }

  updateProduct(ticket: Tickets) {
    this.httpClient.put(`http://localhost:8080/api/ticket/`, ticket)
    .subscribe(
      (data: any) => {
        this.message = 'To προϊόν επεξεργάστικε επιτυχώς';
        this.ngOnInit();
      }
    )
  }

  senfValuesToModalProduct(ticket: Tickets) {

  }

  deleteProduct(id: number ) {
    this.TicketService.deleteProduct
    .subscribe(
      (data: any) => {
        this.message = 'To προϊόν διεγάφει επιτυχώς';
        this.ngOnInit();
      }
    );
  }


}
