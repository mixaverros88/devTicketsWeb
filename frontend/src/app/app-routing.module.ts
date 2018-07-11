import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AdminComponent } from './admin';
import { LoginGuard } from './guard';
import { GuestGuard, AdminGuard } from './guard';
import { NotFoundComponent } from './not-found';
import { ChangePasswordComponent } from './change-password';
import { ForbiddenComponent } from './forbidden';
import { SignupComponent } from './signup';
import { TicketsCrudComponent } from './tickets-crud';
import { TicketsuserComponent } from './ticketsuser/ticketsuser.component'
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ProductpageComponent } from './productpage/productpage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'productpage',
    component: ProductpageComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'ticketcard',
    component: ShoppingcartComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },

  { path: 'productpage/:id',
  component: ProductpageComponent ,
  canActivate: [LoginGuard]},

  {
    path: 'userpage',
    component: UserPageComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'ticketscrud',
    component: TicketsCrudComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'ticketsuser',
    component: TicketsuserComponent,
    pathMatch: 'full' ,
    canActivate: [LoginGuard]
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [GuestGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
