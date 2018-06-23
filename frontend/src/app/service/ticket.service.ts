import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class TicketService {

  [x: string]: any;
  currentUser;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }

  getAll() {
    return this.apiService.get(this.config.allticket_url);
  }
  deleteEmployee(id: number) {
    return this.apiService.delete(this.config.deleteticket_url(id)).map(res => res.json());
  }
  getbyId(id: number) {
    return this.apiService.get(this.config.ticket_urll(id)).map(res => res.json());
  }
}
