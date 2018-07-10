import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  title = 'My first AGM project';
  lat = 38.049506;
  lng = 23.788381;
  cooperative= 'none';

  @ViewChild('email')
  email: ElementRef;

  emailTypes = [
    '@gmail',
    '@yahoo',
    '@hotmail',
    '@outlook',
    '@protonmail',
    '@zoho'
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmitContact() {
    if ( !this.email.nativeElement.value ) {
      alert('Please type your email');
      return;
    }
    const splitter = this.email.nativeElement.value.split('@');
    const emailProvider = splitter[1].split('.');
    if ( !this.emailTypes.includes('@' + emailProvider[0]) ) {
      alert('Please provide a valid email!');
    }
  }
}
