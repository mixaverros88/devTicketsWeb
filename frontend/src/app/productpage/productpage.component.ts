
import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { } from '@types/googlemaps';
import { Http, Response } from '@angular/http';
import {
  TicketService,
  CartService
} from '../service';
import { Ticket } from '../tickets-crud/ticket';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})

@Injectable()
export class ProductpageComponent implements OnInit {
  counterValue = 0;
  ticketString: string;
  id: number;
  ticket: Ticket;
  private sub: any;
  googlelink: string;



  private obj: { 'latitude': number, 'longitude': number }[] = [];
  public latitude: number;
  public longitude: number;
  public userLatitude: number;
  public userLongitude: number;
  public userIcon: string;
  private zoom: number;
  private mapType: string;
  private index: number;
  private tracked = false;
  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.TicketService.getTicket(this.id)
      .subscribe(response => this.renderedTicket(response));


  }

//   getWeather() {
//    const x = this.latitude;
//    const y = this.longitude;
// let url = 'api.openweathermap.org/data/2.5/forecast?lat=';
// url = url + x.toString();
// let plus = '&lon=';
// plus = plus + y.toString();
// const final = url + plus;
// plus = plus + '&appid=b6907d289e10d714a6e88b30761fae22';

//   }




  getlatlng(address) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address).subscribe(res => this.setLocalLat(res));

  }

  setLocalLat(x: any) {

    const data = x;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
    this.index = 0;
    this.zoom = 14;
    // this.latitude = this.latitude;
    // this.longitude = this.longitude;
    console.log(this.latitude);
    console.log(this.longitude);
    this.mapType = 'roadmap';
    this.userIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    // create search FormControl

    // set current position
    this.setCurrentPosition();
    const helper = {
      'latitude': this.latitude,
      'longitude': this.longitude
    };
    this.obj.push(helper);

  }

  renderedTicket(responser: any) {
    this.ticketString = JSON.stringify(responser);
    this.ticket = JSON.parse(this.ticketString);
    this.getlatlng(this.ticket.location);
  }

  addtoCart(id: number) {
    return this.cartService.addtoCart(id);

  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }


  customOnInit() {
    // set google maps defaults
    // this.myLocation();
    this.index = 0;
    this.zoom = 14;
    // this.latitude = this.latitude;
    // this.longitude = this.longitude;
    console.log(this.latitude);
    console.log(this.longitude);
    this.mapType = 'roadmap';
    this.userIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    // create search FormControl

    // set current position
    this.setCurrentPosition();
    const helper = {
      'latitude': this.latitude,
      'longitude': this.longitude
    };
    this.obj.push(helper);
  }
}
