import { CartService } from './../service/cart.service';
import {Cart} from './../shoppingcart/Cart';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ConfigService,
  UserService,
  ApiService,

} from '../service';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';


@Component({


  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
  // tslint:disable-next-line:no-shadowed-variable
  private ConfigService: ConfigService) {
  }



  ngOnInit() {


  }

}
