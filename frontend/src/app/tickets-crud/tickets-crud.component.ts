import { Component, OnInit, Injectable } from '@angular/core';
import { Tickets } from './tickets';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  FooService,
  ConfigService,
  UserService
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
  color:string;
  price: number;
  found: boolean;
  data:any [];
  message: string;
  ticket: Tickets;

  constructor(private httpClient: HttpClient,private config: ConfigService,
    private fooService: FooService,
    private userService: UserService) { 
    
  }

  ngOnInit() {
    if(this.color !=''){
      this.getProducts();
    }

    console.log(this.userService.getAll);
  }
  onNameKeyUp(event: any) {
    console.log("-->" + event.target.value);
    this.name = event.target.value;
    this.found = false;
    if(this.name.length >= 3) {
      this.getProduct(event);
    }
  }

  getProducts() {

    this.userService.getMyInfo().subscribe(
      
    )

    this.httpClient.get(`http://localhost:8080/api/ticket/all`)
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

  postProduct(name: string, color: string, price: number): void {
    this.httpClient.post(`http://localhost:555/products/`,
    {
      name: name,
      color: color,
      price: price
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
    this.httpClient.delete(`http://localhost:8080/api/ticket/${id}`)
    .subscribe(
      (data: any) => {
        this.message = 'To προϊόν διεγάφει επιτυχώς';
        this.ngOnInit();
      }
    );
  }


}
