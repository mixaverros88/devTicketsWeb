import { CustomCounterComponent } from './../custom-counter/custom-counter.component';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {
  ConfigService,
  UserService,
  TicketService,
  ApiService,
  CartService
} from '../service';

@Component({
  selector: 'app-ticketsuser',
  templateUrl: './ticketsuser.component.html',
  styleUrls: ['./ticketsuser.component.css']
})

@Injectable()
export class TicketsuserComponent implements OnInit {

  counterValue = 0;
  data: any [];

  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
  // tslint:disable-next-line:no-shadowed-variable
  private CartService: CartService,
  config: NgbRatingConfig) {
    config.max = 5;
   }

  ngOnInit() {

    this.getProducts();

  }


  addtoCart(id: number) {
    return this.CartService.addtoCart(id);

          }

  getProducts() {
    this.TicketService.getAll()
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.data = data;
         console.log(data);
       }
      }
    );
  }
  starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
rating:number;  
//Create a function which receives the value counting of stars click, 
//and according to that value we do change the value of that star in list.
setStar(data:any){
      this.rating=data+1;                               
      for(var i=0;i<=4;i++){  
        if(i<=data){  
          this.starList[i]=false;  
        }  
        else{  
          this.starList[i]=true;  
        }  
     }  
 }  


}
