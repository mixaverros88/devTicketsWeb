import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from 'app/tickets-crud/ticket';

@Injectable()
export class TicketService {

  [x: string]: any;
  currentUser;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private httpClient: HttpClient

  ) { }

  getAll() {
    return this.apiService.get(this.config.allticket_url);
  }

  deleteEmployee(id: number) {
    return this.apiService.delete(this.config.deleteticket_url(id)).map(res => res.json());
  }
  addTicket(name: number , available: number, language: number , price: number, location: number) {
    // tslint:disable-next-line:member-ordering
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    console.log(name, available, language, location, price);



   // const Indata =new Tickets {'name': name, 'available': available ,'language' :language, 'price': price, 'location' : location };
const ticket = new Ticket();
ticket.name = name.toString();
ticket.available = available;
ticket.language = language.toString();
ticket.price = language;
ticket.location = location.toString();
    console.log(ticket.name + 'eftase edo');
    console.log(ticket);
    return this.apiService.post(this.config.addticket_url, JSON.stringify(ticket), signupHeaders ).subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  };

  getbyId(id: number) {
    return this.apiService.get(this.config.ticket_urll(id)).map(res => res.json());
  }
}
