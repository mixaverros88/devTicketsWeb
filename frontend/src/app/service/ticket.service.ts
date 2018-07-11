import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from 'app/tickets-crud/ticket';

@Injectable()
export class TicketService {

  addProductHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(
    private apiService: ApiService,
    private config: ConfigService,

  ) { }

  getAll() {
    return this.apiService.get(this.config.allticket_url);
  }

  getTicket(id: number) {
    return this.apiService.get(this.config.viewproduct_url(id)).toPromise();
  }

  getAlladminPage(page?: number, size?: number, sort?: String, column?: String) {
    const url = this.config.paginnationticket_url + 'get?page=' + page + '&size=' + size + '&sort=' + sort + '&column=' + column;
    return this.apiService.get(url);
  }

  deleteEmployee(id: number) {
    return this.apiService.delete(this.config.deleteticket_url(id)).map(res => res.json());
  }

  addTicket(date: Date,
    name: string, available: number, language: string, price: number, image: string, location: string) {

    const ticket = {} as Ticket;
    ticket.date = date;
    ticket.name = name.toString();
    ticket.available = available;
    ticket.language = language.toString();
    ticket.price = price;
    ticket.image = image;
    ticket.location = location.toString();

    return this.apiService.post(this.config.addticket_url, JSON.stringify(ticket), this.addProductHeaders).subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  };

  editTicket(ticket: Ticket) {
    return this.apiService.put(this.config.editteticket_url(ticket.id), JSON.stringify(ticket)).toPromise();
  }

  getbyId(id: number) {
    return this.apiService.get(this.config.ticket_urll(id)).map(res => res.json());
  }
}
