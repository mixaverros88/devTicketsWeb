import { Component, OnInit } from '@angular/core';
import { CartService, ConfigService, UserService } from '../service';
import { User } from 'app/login/user';
import { OrdersService } from '../service/orders.service';
import {Cart} from '../shoppingcart';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  data: any[];
  CurrentUserId: number;
  cart: Cart;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService,
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    // tslint:disable-next-line:no-shadowed-variable
    private OrdersService: OrdersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {

    this.myOrders()
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.data = data;
         console.log(data);
       }
      }
    );
  }



getOrder(id: number, content) {

  this.OrdersService.viewOrder(id)
  .subscribe(
    (data: Cart) => {
        this.cart = data;
       console.log(data);
    }
  );
  this.modalService.open(content, {  windowClass: 'dark-modal' });
}

  makeUser(res: any) {
    let user = {} as User;
    console.log(res);
    user = JSON.parse(res);
    console.log(user.id);
    this.CurrentUserId = user.id;

  }

  myOrders() {
    const user = this.UserService.currentUser;
    return this.OrdersService.getOrders(user.id);
  }

  userName() {
    const user = this.UserService.currentUser;
    return user.firstname;
  }
}
