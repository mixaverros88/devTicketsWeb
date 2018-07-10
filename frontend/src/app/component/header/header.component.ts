import { Component, OnInit } from '@angular/core';
import {
  UserService,
  AuthService,
  CartService
} from '../../service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private cartService: CartService,
    public translate: TranslateService
  ) { }


  ngOnInit() {
  }

  // tslint:disable-next-line:member-ordering
  roleAccess = { 'ROLE_ADMIN': true, 'ROLE_USER': true }

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
    return user.firstname;
  }

  cartValue() {
    return Math.round(this.cartService.cartValue() * 100) / 100;
  }

  cartUniqueItems() {
    return this.cartService.cartUniqueItems();
  }

}
