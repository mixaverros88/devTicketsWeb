import { Component, OnInit } from '@angular/core';
import { CartService, UserService } from '../service';
import { User } from 'app/login/user';
import { OrdersService } from '../service/orders.service';
import { Cart } from '../shoppingcart';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  data: any[];
  carttotal: number;
  CurrentUserId: number;
  cart: Cart;
  public myAngularxQrCode: any;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService,
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    // tslint:disable-next-line:no-shadowed-variable
    private OrdersService: OrdersService,
    private modalService: NgbModal,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.myAngularxQrCode = this.userid();
  }

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.spinnerService.show();
    this.myOrders()
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            this.data = data;
            this.spinnerService.hide();
            console.log(this.data);
          }
        }
      );
  }



  getOrder(id: number, content) {
    this.cart = {} as Cart;
    this.OrdersService.viewOrder(id)
      .subscribe(
        (data: Cart) => {
          this.cart = data;
        }
      );
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  getOrder2(id: number, content2) {
    this.cart = {} as Cart;
    this.OrdersService.viewOrder(id)
      .subscribe(
        (data: Cart) => {
          this.cart = data;
          this.carttotal = data.totalPrice;
        }
      );    
    
    this.modalService.open(content2, { windowClass: 'dark-modal' });
  }




  myOrders() {
    const user = this.UserService.currentUser;
    return this.OrdersService.getOrders(user.id);
  }

  userName() {
    const user = this.UserService.currentUser;
    return user.firstname;
  }
  userLastname() {
    const user = this.UserService.currentUser;
    return user.lastname;
  }

  userid() {
    const user = this.UserService.currentUser;
    return 'Καλώς ήρθες' + user.lastname + ' ' + user.firstname + '. Το id σου είναι: ' + user.id + '.DevTickets';
  }

  download() {
    html2canvas(document.getElementById('export')).then(function (canvas) {
      const img = canvas.toDataURL('assets/image/dev-logo.png');
      const doc = new jsPDF('l', 'in', 'a4');
      doc.addImage(img, 'JPEG', 0, 0);
      doc.save('ticket.pdf');
    });
  }




}
