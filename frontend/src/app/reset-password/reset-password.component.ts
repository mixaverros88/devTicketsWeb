import { ApiService } from './../service/api.service';
import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UserService,
  AuthService
} from '../service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ApiService: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,) {
    this.form = fb.group({
      'email': [null, Validators.required]

    })

  }
  ngOnInit() {

  }

  onSubmitForm() {
    const email = this.form.controls['email'].value;
    console.log(email);
    this.authService.resetPassword(email);
  }


}
