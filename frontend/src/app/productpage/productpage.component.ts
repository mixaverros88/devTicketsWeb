
import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { } from '@types/googlemaps';
import {
  TicketService,
  CartService,
  ApiService
} from '../service';
import { Ticket } from '../tickets-crud/ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';




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
  weather: any;



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
    private httpClient: HttpClient,
  private apiService: ApiService) { }
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.TicketService.getTicket(this.id)
      .subscribe(response => this.renderedTicket(response));


  }

  getWeather(){
   const url2 = 'http://api.openweathermap.org/data/2.5/forecast?lat='
    +this.latitude.toString()+ '&lon=' +this.longitude.toString() + '&appid=3997d67a9cec7864de6b77f35b0dc7c4';
this.httpClient.get(url2).subscribe(res => this.saveWeather(res));  }

saveWeather(x:any){
this.weather = x;
this.weather.main = (x.list[39].weather[0].main);
this.weather.temp =Math.round((x.list[39].main.temp) - (273.15));
this.weather.description = x.list[39].weather[0].description;
this.weather.image = 'http://openweathermap.org/img/w/'  + x.list[39].weather[0].icon +'.png'
console.log(this.weather.image);

}




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
    this.mapType = 'roadmap';
    this.userIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    this.setCurrentPosition();
    const helper = {
      'latitude': this.latitude,
      'longitude': this.longitude
    };
    this.obj.push(helper);
this.getWeather();
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
