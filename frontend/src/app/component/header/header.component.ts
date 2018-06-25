import { Component, OnInit } from '@angular/core';
import {
  UserService,
  AuthService,
  TicketService,
  CartService
} from '../../service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Cart } from '../../shoppingcart/Cart';
import { CartItem } from '../../shoppingcart/CartItem'
=======
import {TranslateService} from '@ngx-translate/core';
>>>>>>> f51dc7d3d826754b3203df5721ed5b5f6a6920f1

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
<<<<<<< HEAD
    private cartService: CartService
  ) { }
=======
    public translate: TranslateService
  ) { 
    
  }
>>>>>>> f51dc7d3d826754b3203df5721ed5b5f6a6920f1

  ngOnInit() {
  }

<<<<<<< HEAD
  // tslint:disable-next-line:member-ordering
  roleAccess = { 'ROLE_ADMIN': true, 'ROLE_USER': true }
=======
 
>>>>>>> f51dc7d3d826754b3203df5721ed5b5f6a6920f1

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  
  userRole() {
    const user = this.userService.currentUser;
    if (user.authorities[1]) {
      return user.authorities[1].authority;
    } else {
      return user.authorities[0].authority;
    }
  }

  userName() {
    const user = this.userService.currentUser;
    return user.firstname + ' ' + user.lastname;
  }

  cartValue() {
return this.cartService.cartValue() ;
     }
cartUniqueItems() {
return this.cartService.cartUniqueItems() ;
}




}
