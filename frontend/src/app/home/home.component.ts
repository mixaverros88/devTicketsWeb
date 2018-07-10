import { Component, OnInit } from '@angular/core';
import {
  ConfigService,
  UserService
} from '../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  whoamIResponse = {};
  allUserResponse = {};
  constructor(
    private config: ConfigService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }


}
