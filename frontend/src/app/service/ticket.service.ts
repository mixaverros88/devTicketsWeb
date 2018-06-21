import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class TicketService {

  currentUser;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }

  getAll() {
    return this.apiService.get(this.config.allticket_url);
  }

  getbyId(id: any) {
    const a = this.apiService.delete(this.config.ticket_url);
    return a + '/' + id.toString();
}

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url).map(user => this.currentUser = user);
  }
  deleteTicket(id: number ) {
const a = this.apiService.delete(this.config.getdeleteticket_url());
    return a + '/' + id.toString();
  }

}
