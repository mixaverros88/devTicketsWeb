import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 38.049506;
  lng: number = 23.788381;

  constructor() { }

  ngOnInit() {
  }

}
