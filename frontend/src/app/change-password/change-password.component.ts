import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/service';
import { Router } from '@angular/router';
import { DisplayMessage } from '../shared/models/display-message';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup
  submitted = false;
  notification: DisplayMessage;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });

  }


  onSubmit() {
    this.notification = undefined;
    this.submitted = true;
    this.authService.changePassowrd(this.form.value)
    .delay(1000)
    .mergeMap(() => this.authService.logout())
    .subscribe(() => {
      this.router.navigate(['/login', { msgType: 'success', msgBody: 'Success! Please sign in with your new password.'}]);
    }, error => {
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: 'Invalid old password.'};
    });

  }

}
