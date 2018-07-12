import { Component, OnInit,  } from '@angular/core';
import { CartService, ConfigService, UserService } from '../service';
import { User } from '../login/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  data: any[];
  CurrentUserId: number;
  shippingCost = 5;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService,
    private modalService: NgbModal) {
  }
  ngOnInit() {
    this.data = this.CartService.getCartProducts();
  }

  getRawValue() {
    return this.CartService.cartValue();
  }

  getUniqueItems() {
    return this.CartService.cartUniqueItems();

  }

  getTax() {
    const final = (((this.CartService.cartValue()) * 5) / 100);
    return final;
  }

  getCartValue() {
    let final = this.CartService.cartValue();
    final = final + this.getTax();
    final = final + 5;
    return final;
  }


  makeUser(res: any) {
    let user = {} as User;
    user = JSON.parse(res);
    this.CurrentUserId = user.id;

  }

  async commitOrder() {
    this.makeUser(JSON.stringify(this.UserService.currentUser));
  }

  checkout(content) {
    this.commitOrder()
      .then( () => {
      delay(3000);
      this.CartService.checkout(this.CurrentUserId);
      this.CartService.clearCart();
      this.modalService.open(content, { size: 'lg' });
    })
    .catch(() => alert('We apologise something went wrong') );
  }


}
