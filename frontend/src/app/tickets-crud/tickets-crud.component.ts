import { DatePicketPopupComponent } from './../date-picket-popup/date-picket-popup.component';
import { TicketService } from './../service/ticket.service';
import { Component, OnInit, Injectable, ElementRef, ViewChild, Input, NgZone } from '@angular/core';
import { Ticket } from './ticket';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePicker } from './datePicker';
import { ChartsModule } from 'ng2-charts';
import { } from '@types/googlemaps';

// In your App's module:

import {

  ConfigService,
  UserService,
  CartService,
  ApiService,
} from '../service';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { delay } from 'q';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-tickets-crud',
  templateUrl: './tickets-crud.component.html',
  styleUrls: ['./tickets-crud.component.css'],
  
})



@Injectable()
export class TicketsCrudComponent implements OnInit {

  model: NgbDateStruct;

  @ViewChild('fileInput') fileInput: ElementRef;

  modalRef: any;
  modalRefInsert: any;

  base64textString;
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
  description: string;
  language: string;
  available: number;
  price: number;
  location: string;
  found: boolean;
  data: any[];
  message: string;
  ticket: Ticket;
  selectedProduct: Ticket;
  date: Date;
  // PAGINATION VALUES
  howManyRows = 2;
  totalProducts: number;
  curentPage = 1;
  paginationLength = 0;
  orderByColumn = 'id';
  orderBy = 'desc';
  // PAGINATION VALUES

  closeResult: string;

  // fields used for google maps and geolocation
  @Input() usePanning = false;
  private obj: { 'latitude': number, 'longitude': number} [] = [];
  public latitude: number;
  public longitude: number;
  public userLatitude: number;
  public userLongitude: number;
  public userIcon: string;
  private searchControl: FormControl;
  private zoom: number;
  private mapType: string;
  private index: number;
  private tracked = false;

  @ViewChild('locationInput')
  public searchElementRef: ElementRef;


  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    // tslint:disable-next-line:no-shadowed-variable
    private modalService: NgbModal,
    private fb: FormBuilder,
    // google maps
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _mapsWrapper: GoogleMapsAPIWrapper
  ) {

    this.userDetailsForm = fb.group({
      'name': [null, Validators.compose(
                                        [Validators.minLength(3), Validators.required]
              )],
      'description': [null, Validators.required] ,
      'language': [null, Validators.required] ,
      'image': [null, Validators.required] ,
      'available': [null, Validators.required] ,
      'location': [null,] ,
      'price': [null, Validators.required] ,

    })

  }

  ngOnInit() {

    this.getProducts();
    this.customOnInit();

    this.userDetailsForm = new FormGroup({
      date: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      available: new FormControl(''),
      location: new FormControl(''),
      image: new FormControl(''),
      language: new FormControl('')
    });
  }

  customOnInit() {
    // set google maps defaults
    // this.myLocation();
    this.index = 0;
    this.zoom = 14;
    this.latitude = 37.97565120000001;
    this.longitude = 23.73400079999999;
    this.mapType = 'roadmap';
    this.userIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [], // change: from ['address'] to [], in order to include all options (address, establishments & geocodes)
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;
          this.index++;
          this.location = place.formatted_address.toString();
          const helper = {
            'latitude': this.latitude,
            'longitude': this.longitude
          };
          this.obj.push(helper);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }

  setMapType(mapTypeId: string) {
    this.mapType = mapTypeId;
  }

  myLocation() {
    this.setCurrentPosition();
    this.latitude = this.userLatitude;
    this.longitude = this.userLongitude;
    this._setCenter();
    this.tracked = true;
  }

  private _setCenter() {
    const newCenter = {
      lat: this.latitude,
      lng: this.longitude,
    };
    if (this.usePanning) {
      this._mapsWrapper.panTo(newCenter);
    } else {
      this._mapsWrapper.setCenter(newCenter);
    }
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

  editProduct(id: number, name: string, language: string, available: number, location: string, price: number): void {
    const ticket = {} as Ticket;
    ticket.id = id;
    ticket.name = name;
    ticket.language = language;
    ticket.available = available;
    ticket.location = location;
    ticket.price = price;
    this.TicketService.editTicket(ticket)
      .then(
        this.modalRef.close());
        this.message = 'Επιτυχής Επεξεργασία Εισιτηρίου';
       delay(3300);
       ;
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

  currentDate() {
    const currentDate = new Date();
    return currentDate;
  }

  setDate(month: any, day: any, year: any) {
    const currentDate = new Date();
    currentDate.setDate(day);
    currentDate.setMonth(month);
   currentDate.setFullYear(year)
    return currentDate;
  }


  onChangeForm() {
    // console.log(this.userDetailsForm.controls['date'].value);

  const date = this.userDetailsForm.controls['date'].value;
  let newDate = new Date();
  newDate = this.setDate(date.month, date.day, date.year);
   this.date = newDate;
   console.log(this.date);
    this.name = this.userDetailsForm.controls['name'].value.toString();
    this.available = this.userDetailsForm.controls['available'].value;
    this.price = this.userDetailsForm.controls['price'].value;
    console.log(this.price);
    this.language = this.userDetailsForm.controls['language'].value.toString();
    this.location = this.location;
  }


  onSubmitUserDetails() {
    console.log(this.date);
    this.TicketService.addTicket(
    this.date,
    this.userDetailsForm.controls['name'].value.toString(),
    this.userDetailsForm.controls['available'].value,
    this.userDetailsForm.controls['language'].value.toString(),
    this.price,
    this.base64textString,
    this.location);
   // this.modalRefInsert.close(); // close modal
    this.message = 'Επιτυχής εισαγωγή εισιτηρίου';
    this.ngOnInit();
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
