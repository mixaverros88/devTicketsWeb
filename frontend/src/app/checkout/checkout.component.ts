import { Component, OnInit,  } from '@angular/core';
import { CartService, ConfigService, UserService, ApiService } from '../service';
import { User } from '../login/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formVar: FormGroup;

  data: any[];
  CurrentUserId: number;
  shippingCost = 5;
content:any;
  afm: string;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  private config: ConfigService,
private apiservice: ApiService) {
  }
  ngOnInit() {
    this.formVar = this.fb.group({
      afm: 0,
    });

    this.data = this.CartService.getCartProducts();

  }
  onSubmit(contentAfm) {
    const p = this.formVar.value.afm;
    this.getAfm(p);
    this.content = contentAfm;

  }
  setAfm(x) {
    this.afm = x.error.text;
    console.log(this.afm);
    this.modalService.open(this.content, { size: 'lg' });

  }

    getAfm(id: string) {
  const p = this.apiservice.get(this.config.get_afm(id)).subscribe(res => this.setAfm(res), err => this.setAfm(err));

  }
  getRawValue() {
    return Math.round((this.CartService.cartValue() * 100)  / 100);
  }


  roundNumber(x: number , y: number) {
    const p = Math.round((x * y) * 100 ) / 100;
  return p;
    }

  getUniqueItems() {
    return this.CartService.cartUniqueItems();

  }

  getTax() {
    const final = (((this.CartService.cartValue()) * 5) / 100);
    return Math.round(final);
  }

  getCartValue() {
    let final = this.CartService.cartValue();
    final = final + this.getTax();
    final = final + 5;
    return Math.round((final * 100) / 100);
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
    .catch(() => {
      this.modalService.open('We apologise something went wrong', { size: 'lg' });
    })
  }


}
