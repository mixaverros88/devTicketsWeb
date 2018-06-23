import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

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
  addTicket(name: number , available: number, language: number , price: number, location: number) {
    // tslint:disable-next-line:member-ordering
    const myObject: any = {'name': name , 'available': available , 'language': language , 'price': price ,
    'location' : location };
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: Headers };
return this.apiService.post(this.config.addticket_url, options)};

  getbyId(id: number) {
    return this.apiService.get(this.config.ticket_urll(id)).map(res => res.json());
  }
}
