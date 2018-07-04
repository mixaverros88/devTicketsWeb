import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { QRCodeModule } from 'angularx-qrcode';




// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// material
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatInputModule,
  MatIconRegistry,
  MatProgressSpinnerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LoginGuard, GuestGuard, AdminGuard } from './guard';
import { NotFoundComponent } from './not-found';
import { AccountMenuComponent } from './component/header/account-menu/account-menu.component';
import {
  HeaderComponent,
  ApiCardComponent,
  FooterComponent,

} from './component';

import {
  ApiService,
  AuthService,
  UserService,
  FooService,
  ConfigService
} from './service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { TicketsCrudComponent } from './tickets-crud/tickets-crud.component';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
import { TicketService } from './service/ticket.service';
import { TicketsuserComponent } from './ticketsuser/ticketsuser.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import {CartService} from './service/cart.service';
import { DatePicketPopupComponent } from './date-picket-popup/date-picket-popup.component';
import { CustomCounterComponent } from './custom-counter/custom-counter.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserPageComponent } from './user-page/user-page.component';
import { OrdersService } from './service/orders.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChartsModule } from 'ng2-charts';
import { AdminPanelComponentComponent } from './admin-panel-component/admin-panel-component.component';

export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApiCardComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    AccountMenuComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    AdminComponent,
    SignupComponent,
    TicketsCrudComponent,
    CarouselBasicComponent,
    TicketsuserComponent,
    ShoppingcartComponent,
    DatePicketPopupComponent,
    CustomCounterComponent,
    ContactComponent,
    CheckoutComponent,
    UserPageComponent,
    ResetPasswordComponent,
    AdminPanelComponentComponent
  ],
  imports: [
    ChartsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    QRCodeModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdhieodd82faXY6cWOfet7YeS7ZLVXhjc'
    }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [
    TicketService,
    LoginGuard,
    GuestGuard,
    AdminGuard,
    FooService,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
    MatIconRegistry,
    CartService,
    OrdersService,    {
      'provide': APP_INITIALIZER,
      'useFactory': initUserFactory,
      'deps': [UserService],
      'multi': true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
