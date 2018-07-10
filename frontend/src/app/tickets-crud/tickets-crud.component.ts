import { TicketService } from './../service/ticket.service';
import { Component, OnInit, Injectable, ElementRef, ViewChild, Input, NgZone } from '@angular/core';
import { Ticket } from './ticket';
import { NgbModal, ModalDismissReasons, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../service/user.service'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { delay } from 'q';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-tickets-crud',
  templateUrl: './tickets-crud.component.html',
  styleUrls: ['./tickets-crud.component.css'],

})



@Injectable()
export class TicketsCrudComponent implements OnInit {


  single: any[];
  multi: any[];
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

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
  chart: { 'name': string, 'value': number }[] = [];
  chartUserNumber: number;
  chartUserGoal: number;
  chartUserObj: { 'name': string, 'value': number }[] = [];
  legendTitleBar = 'Events';
  xAxisLabelBar = 'Event';
  yAxisLabelBar = 'Price';

  // PAGINATION VALUES
  totalPages;
  last: boolean;
  totalElements: number;
  size = 5;
  number = 0;
  sort = 'desc';
  first: boolean;
  numberOfElements: number;
  orderByColumn: String = 'id';
  closeResult: string;

  // fields used for google maps and geolocation
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

  @ViewChild('locationInput')
  public searchElementRef: ElementRef;


  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService,
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _mapsWrapper: GoogleMapsAPIWrapper
  ) {
    Object.assign(this.chart)

    this.userDetailsForm = fb.group({
      'name': [null, Validators.compose(
        [Validators.minLength(3), Validators.required]
      )],
      'description': [null, Validators.required],
      'language': [null, Validators.required],
      'image': [null, Validators.required],
      'available': [null, Validators.required],
      'location': [null],
      'price': [null, Validators.required],

    })

  }

  goToProductDetails(id) {
    this.router.navigate(['/productpage', id]);
  }

  ngOnInit() {

    this.getProducts();
    this.customOnInit();
    // this.counter(this.totalPages);
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
    this.getChartProducts();
    this.getChartUsers();
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
    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
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
      .then( this.modalRef.close())
      .then ( () => this.getProducts() )
      .then ( () => this.message = 'Επιτυχής Επεξεργασία Εισιτηρίου' )
  }

  orderByName(column: String) {
    this.orderByColumn = column;
    this.getProducts();
  }

  getProducts() {
    this.TicketService.getAlladminPage(this.number, this.size, this.sort, this.orderByColumn)
      .subscribe(
        (data: any[]) => {
          if (data['content']) {
            this.data = data['content'];
           ;
          }

          this.totalPages = data['totalPages'];
          this.last = data['last'];
          this.totalElements = data['totalElements'];
          this.size = data['size'];
          this.number = data['number'];
          this.first = data['first'];
          this.numberOfElements = data['numberOfElements'];

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

    const date = this.userDetailsForm.controls['date'].value;
    let newDate = new Date();
    newDate = this.setDate(date.month, date.day, date.year);
    this.date = newDate;
    this.name = this.userDetailsForm.controls['name'].value.toString();
    this.available = this.userDetailsForm.controls['available'].value;
    this.price = this.userDetailsForm.controls['price'].value;
    this.language = this.userDetailsForm.controls['language'].value.toString();
    this.location = this.location;
  }


  onSubmitUserDetails() {

    this.TicketService.addTicket(
      this.date,
      this.userDetailsForm.controls['name'].value.toString(),
      this.userDetailsForm.controls['available'].value,
      this.userDetailsForm.controls['language'].value.toString(),
      this.price,
      this.base64textString,
      this.location);
    this.message = 'Επιτυχής εισαγωγή εισιτηρίου';
    delay(6000);
    this.getProducts();
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

  changePage(page) {
    this.number = page - 1;
    this.getProducts();
  }

  changeShowRows(howManyRows) {
    this.size = howManyRows;
    this.getPagination(this.totalElements, howManyRows);
    this.getProducts();
  }

  getPagination(totalProducts, howManyRows) {
    this.totalPages = Math.ceil(totalProducts / howManyRows);
    console.log(totalProducts + ' / ' + howManyRows);
    console.log(this.totalPages);
  }

  counter(totalPages: number) {
    return new Array(totalPages);
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
  }

  onDelete(id: number) {
    this.notification = undefined;
    this.submitted = true;

    this.TicketService.deleteEmployee(id)
      .subscribe(() => {
        this.data.splice(id);

      }, error => {
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

  getChartProducts() {

    this.TicketService.getAlladminPage(this.number, this.size, this.sort, this.orderByColumn)
      .subscribe(
        (chart: any[]) => {

          let item = 0;

          if (chart['content']) {
            while (item < chart['content'].length) {

              const chartItem = {
                'name': chart['content'][item].name,
                'value': chart['content'][item].price
              };

              this.chart.push(chartItem);
              item++;
            }

          }
        });

  }


  getChartUsers() {

    this.UserService.getAll()
      .subscribe(
        (chartUser: any[]) => {
          this.chartUserNumber = chartUser.length;
          const chartItemUser = {
            'name': 'Number of Users',
            'value': this.chartUserNumber
          };
          this.chartUserObj.push(chartItemUser);
        });
  }



}
