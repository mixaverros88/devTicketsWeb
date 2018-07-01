import { Component, OnInit } from "@angular/core";
import { CartService, ConfigService, UserService } from "../service";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"]
})
export class UserPageComponent implements OnInit {
  data: any[];

  constructor(
    private UserService: UserService,
    private CartService: CartService
  ) {}

  ngOnInit() {
    this.data = this.CartService.getCartProducts();
  }

  userName() {
    const user = this.UserService.currentUser;
    return user.firstname;
  }
}
