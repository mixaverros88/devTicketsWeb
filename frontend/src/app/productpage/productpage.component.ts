
import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TicketService,
  CartService
} from '../service';
import { Ticket } from '../tickets-crud/ticket';
import { HttpClient} from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';




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
  coffeelist: any;



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
  private data: any;

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
      .then(response => this.renderedTicket(response));


  }

  getWeather() {
   const url2 = 'http://api.openweathermap.org/data/2.5/forecast?lat='
    + this.latitude.toString() + '&lon=' + this.longitude.toString() + '&appid=3997d67a9cec7864de6b77f35b0dc7c4';
this.httpClient.get(url2).subscribe(res => this.saveWeather(res));  }

saveWeather(x: any) {
this.weather = x;
this.weather.main = (x.list[39].weather[0].main);
this.weather.temp = Math.round((x.list[39].main.temp) - (273.15));
this.weather.description = x.list[39].weather[0].description;
this.weather.image = 'http://openweathermap.org/img/w/'  + x.list[39].weather[0].icon + '.png'

}





getCoffees() {
  const urlfour =  'https://api.foursquare.com/v2/venues/search?ll=' + this.latitude.toString() +
  // tslint:disable-next-line:max-line-length
  ',' + this.longitude.toString() + '&client_id=V4GIRK5KBTNVS3VRE55I4AZAQMPSGEPDA2E0HPXSRVPBGWZB&client_secret=0TN33JNVI3DZL5CQCI12OQECM52WGFFI1K4SOUMMKNPLBB2L&v=20180101&categoryId=4bf58dd8d48988d1e0931735';
this.httpClient.get(urlfour).subscribe(res => this.makeCoffeeList(res));

}

makeCoffeeList(x: any) {
this.coffeelist = x;
this.coffeelist.name1 = this.coffeelist.response.venues[0].name;
this.coffeelist.address1 = this.coffeelist.response.venues[0].location.address;
this.coffeelist.name2 = this.coffeelist.response.venues[1].name;
this.coffeelist.address2 = this.coffeelist.response.venues[1].location.address;
this.coffeelist.name3 = this.coffeelist.response.venues[2].name;
this.coffeelist.address3 = this.coffeelist.response.venues[2].location.address;
this.coffeelist.name4 = this.coffeelist.response.venues[3].name;
this.coffeelist.address4 = this.coffeelist.response.venues[3].location.address;
this.coffeelist.name5 = this.coffeelist.response.venues[4].name;
this.coffeelist.address5 = this.coffeelist.response.venues[4].location.address;
return this.coffeelist;
    }


  getGooglePromise(address): Promise<any> {
   return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address).toPromise();
      ;
  }
  getlatlng(address) {
    return this.getGooglePromise(address).then(res => this.setLocalLat(res));
       ;
   }


  setLocalLat(x: any) {

    this.data = x;
    this.latitude = this.data.results[0].geometry.location.lat;
    this.longitude = this.data.results[0].geometry.location.lng;
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
this.getCoffees();

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
  }
}
