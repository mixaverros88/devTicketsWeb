import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from 'app/tickets-crud/ticket';
import { Cart } from '../shoppingcart';

@Injectable()
export class TicketService {

  addProductHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

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

  addTicket(date: {year: number, month: number, date: number},
    name: number, available: number, language: number, price: number, image: string, location: number) {

    const dateToInsert = new Date(date.year, date.year, date.month);
   const  ticket = {} as Ticket;
   console.log(dateToInsert);
    ticket.date = dateToInsert;
    ticket.name = name.toString();
    ticket.available = available;
    ticket.language = language.toString();
    ticket.price = language;
    ticket.image = image;
    ticket.location = location.toString();
    console.log(ticket.image + ' <-- Image');
    console.log(ticket.name + 'eftase edo');
    console.log(ticket);
    return this.apiService.post(this.config.addticket_url, JSON.stringify(ticket), this.addProductHeaders).subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  };

  editTicket(ticket: Ticket) {
    return new Promise(resolve => {
              this.apiService.put(this.config.editteticket_url(ticket.id), JSON.stringify(ticket)).subscribe(
      response => 'response',
      err => console.log(err))
        }
  };

  getbyId(id: number) {
    return this.apiService.get(this.config.ticket_urll(id)).map(res => res.json());
  }
}
