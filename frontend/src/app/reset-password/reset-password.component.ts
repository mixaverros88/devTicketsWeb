import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthService
} from '../service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ApiService: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      'email': [null, Validators.required]
    })

  }
  ngOnInit() {

  }

  onSubmitForm() {
    const email = this.form.controls['email'].value;
    this.authService.resetPassword(email);
    this.router.navigate(['/login', { msgType: 'success', msgBody: 'Success! Please sign in with your new password.'}]);

  }


}
