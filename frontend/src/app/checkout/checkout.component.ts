import { Component, OnInit } from '@angular/core';
import { CartService, ConfigService, UserService } from '../service';
import { USE_DEFAULT_LANG } from '@ngx-translate/core';
import { User } from '../login/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  data: any[];
  CurrentUserId: number;
  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    // tslint:disable-next-line:no-shadowed-variable
    private ConfigService: ConfigService,
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService) {
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
    console.log(res);
    user = JSON.parse(res);
    console.log(user.id);
    this.CurrentUserId = user.id;

  }



  checkout() {
    this.UserService.getMyInfo().subscribe(response => this.makeUser(JSON.stringify(response)));
    console.log(this.CurrentUserId);
    this.CartService.checkout(this.CurrentUserId);
  }


}
