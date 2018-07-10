import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayMessage } from '../shared/models/display-message';
import {
  UserService,
  AuthService
} from '../service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  title = 'Login';
  form: FormGroup;
  submitted = false;
  notification: DisplayMessage;

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onResetCredentials() {
    this.authService.resetPassword('user1');

  }


  onSubmit() {
    this.notification = undefined;
    this.submitted = true;
    this.authService.login(this.form.value)
    .delay(1000)
    .subscribe(data => {
      this.userService.getMyInfo().subscribe();
      this.router.navigate([this.returnUrl]);
    },
    error => {
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: 'Incorrect username or password.' };
    });

  }


}
