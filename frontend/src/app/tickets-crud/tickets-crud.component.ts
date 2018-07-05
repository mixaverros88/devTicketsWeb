import { DatePicketPopupComponent } from './../date-picket-popup/date-picket-popup.component';
import { TicketService } from './../service/ticket.service';
import { Component, OnInit, Injectable, ElementRef, ViewChild, Input, NgZone } from '@angular/core';
import { Ticket } from './ticket';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePicker } from './datePicker';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { } from 'googlemaps';

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
  date: string;
  // PAGINATION VALUES
  howManyRows = 2;
  totalProducts: number;
  curentPage = 1;
  paginationLength = 0;
  orderByColumn = 'id';
  orderBy = 'desc';
  // PAGINATION VALUES

  closeResult: string;

  // google maps fields
  @Input() usePanning = false;
  private obj: { 'latitude': number, 'longitude': number }[] = [];
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

  private place: google.maps.places.PlaceResult;
  @ViewChild('locationInput')
  public searchElementRef: ElementRef;

  // end of google maps fields



  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    // needed for google maps
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _mapsWrapper: GoogleMapsAPIWrapper
  ) {

    this.userDetailsForm = fb.group({
      'date': ['2018-01-01', Validators.required],
      'name': [null, Validators.compose(
        [Validators.minLength(3), Validators.required]
      )],
      'description': [null, Validators.required],
      'language': [null, Validators.required],
      'image': [null, Validators.required],
      'available': [null, Validators.required],
      'location': [null, Validators.required],
      'price': [null, Validators.required],

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
    this.customOnInit();
    this.userDetailsForm = new FormGroup({
      date: new FormControl('2018-01-01'),
      name: new FormControl(''),
      description: new FormControl(''),
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
    this.TicketService.editTicket(ticket)
      .then(
        this.modalRef.close());
    this.message = 'Επιτυχής Επεξεργασία Εισιτηρίου';
    delay(3300);
    this.getProducts();
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

  onChangeForm() {
    // console.log(this.userDetailsForm.controls['date'].value);
    const date = this.userDetailsForm.controls['date'].value;
    this.date = date['year'] + '-' + date['month'] + '-' + date['day'];
    // console.log('-->' + this.date.month);
    // console.log('-->' + this.date['day']);
    this.name = this.userDetailsForm.controls['name'].value.toString();
    this.description = this.userDetailsForm.controls['description'].value.toString();
    this.available = this.userDetailsForm.controls['available'].value;
    this.price = this.userDetailsForm.controls['price'].value;
    this.language = this.userDetailsForm.controls['language'].value.toString();
    this.location = this.userDetailsForm.controls['location'].value;
  }


  onSubmitUserDetails() {
    this.userDetailsForm.setValue({
      'location': '' + this.longitude + '/' + this.latitude
      // this.place.formatted_address
    });
    console.log(this.userDetailsForm.controls['location'].value);
    this.TicketService.addTicket(
      this.userDetailsForm.controls['date'].value,
      this.userDetailsForm.controls['name'].value.toString(),
      this.userDetailsForm.controls['available'].value,
      this.userDetailsForm.controls['price'].value,
      this.userDetailsForm.controls['language'].value.toString(),
      this.base64textString,
      this.userDetailsForm.controls['location'].value);
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

  // following auxiliary methods for google maps
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.zoom = 14;
        console.log(this.userLatitude);
        console.log(this.userLongitude);
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
    console.log('ok');
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

  customOnInit() {
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
          this.place = autocomplete.getPlace();

          // verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          console.log('here');
          console.log(this.longitude);
          console.log(this.latitude);
          this.location = this.place.formatted_address as string;
          // this.userDetailsForm.controls['language'] = this.location;
          // set latitude, longitude and zoom
          /* this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          this.zoom = 14;
          this.index++;
          const helper = {
            'latitude': this.latitude,
            'longitude': this.longitude
          };
          this.obj.push(helper);
          console.log(this.obj);
          */
        });
      });
    });
  }

  // locationInput

}
