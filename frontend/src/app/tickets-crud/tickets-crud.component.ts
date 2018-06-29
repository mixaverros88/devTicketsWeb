import { TicketService } from './../service/ticket.service';
import { Component, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import { Ticket } from './ticket';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import {
  ConfigService,
  UserService,
  CartService,
  ApiService,
} from '../service';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tickets-crud',
  templateUrl: './tickets-crud.component.html',
  styleUrls: ['./tickets-crud.component.css']
})

@Injectable()
export class TicketsCrudComponent implements OnInit {

  model: NgbDateStruct;

  @ViewChild('fileInput') fileInput: ElementRef;

  modalRef: any;
  modalRefInsert: any;

  base64textString = '';
  userDetailsForm: FormGroup;
  user_data: FormGroup;
  checkinTemp: any;
  notification: any;
  submitted: boolean;
  authService: any;
  form: any;
  router: any;
  http: any;
  id: number;
  name: string;
  language: string;
  available: number;
  price: number;
  location: string;
  found: boolean;
  data: any[];
  message: string;
  ticket: Ticket;
  selectedProduct: Ticket;

  // PAGINATION VALUES
  howManyRows = 2;
  totalProducts: number;
  curentPage = 1;
  paginationLength = 0;
  orderByColumn = 'id';
  orderBy = 'desc';
  // PAGINATION VALUES

  closeResult: string;


  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    private modalService: NgbModal,
  private fb: FormBuilder) {

    this.userDetailsForm = fb.group({
      'name': ['dsa', Validators.required] ,
      'language': [null, Validators.required] ,
      'available': [null, Validators.required] ,
      'location': [null, Validators.required] ,
      'price': [null, Validators.required] ,

    })

  }



  open(content) {
    this.modalRefInsert = this.modalService.open(content);
    this.modalRefInsert.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {

    this.getProducts();
    this.userDetailsForm = new FormGroup({
      date: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      available: new FormControl(''),
      location: new FormControl(''),
      image: new FormControl(''),
      language: new FormControl('')
    });

  }

  editProduct(id: number, name: string, language: string, available: number, location: string, price: number): void {
    const ticket = {} as Ticket;
    ticket.id = id;
    ticket.name = name;
    ticket.language = language;
    ticket.available = available;
    ticket.location = location;
    ticket.price = price;
    this.TicketService.editTicket(ticket);
    this.modalRef.close(); // close modal
    this.message = 'Επιτυχής Επεξεργασία Εισιτηρίου';
    this.ngOnInit(); // refresh the tickets
  }

  getProducts() {
    this.TicketService.getAll()
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            this.data = data;
            console.log(data);
          }
        }
      );
  }

  onSubmitUserDetails() {

    this.TicketService.addTicket(
      this.userDetailsForm.controls['date'].value,
      this.userDetailsForm.controls['name'].value.toString(),
      this.userDetailsForm.controls['available'].value,
      this.userDetailsForm.controls['price'].value,
      this.userDetailsForm.controls['language'].value.toString(),
      this.base64textString ,
      this.userDetailsForm.controls['location'].value);
       this.modalRefInsert.close(); // close modal
    this.message = 'Επιτυχής εισαγωγή εισιτηρίου';
    this.ngOnInit();
    ;
  }


  open2(content2) {
    this.modalRef = this.modalService.open(content2);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSelectedProduct(pr) {
    this.selectedProduct = pr;
  }

  onChange(deviceValue) {
    this.howManyRows = deviceValue;
    this.getPagination(this.totalProducts, this.howManyRows);
    this.getProducts();
  }

  getPagination(totalProducts, howManyRows) {
    this.paginationLength = Math.ceil(totalProducts / howManyRows);
    console.log(totalProducts + ' / ' + howManyRows);
    console.log(this.paginationLength);
  }



    onFileSelected(evt) {
      // console.log(event.target.files[0].name);
      const files = evt.target.files;
      const file = files[0];

    if (files && file) {
        const reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
           this.base64textString = btoa(binaryString);
           console.log(btoa(binaryString));
   }

  onDelete(id: number) {
    this.notification = undefined;
    this.submitted = true;

    this.TicketService.deleteEmployee(id)
      // show me the animation
      .subscribe(() => {
        this.data.splice(id);

      }, error => {
        console.log('mpike');
        let index = 0;
        for (let i = 0; i < this.data.length; i++) {

          if (this.data[i].id === id) {
            index = i;
          }

        }
        this.data.splice(index, 1);
      });
    this.message = 'Ticket Deleted';

  }

}
