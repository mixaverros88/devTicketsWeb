import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  private _api_url = '/api'

  private _refresh_token_url = this._api_url + '/refresh';

  private _login_url = this._api_url + '/login';

  private _logout_url = this._api_url + '/logout';

  private _change_password_url = this._api_url + '/changePassword';

  private _whoami_url = this._api_url + '/whoami';

  private _user_url = this._api_url + '/user';

  private _ticket_url = this._api_url + '/ticket';

  private _ticket_urll = this._api_url + 'ticket/';

 private _addticket_url = this._api_url + '/ticket/add';

  private _alltickets_url = this._ticket_url  + '/all';

  private _edittickets_url = this._ticket_url  + '/edit/';

  private _deleteticket_url = this._ticket_url + '/delete/';

  private _users_url = this._user_url + '/all';

  private _reset_credentials_url = this._user_url + '/reset-credentials';

  private _foo_url = this._api_url + '/foo';

  private _signup_url = this._api_url + '/signup';

  private _addtocart_url = this._api_url + '/addcart/';

  private _delete_from_cart = this._api_url + '/deletecartitem/';

  get reset_credentials_url(): string {
      return this._reset_credentials_url;
  }


  get refresh_token_url(): string {
      return this._refresh_token_url;
  }

  get addticket_url(): string {

return this._addticket_url ;
  }



  get allticket_url(): string {

    return this._alltickets_url;

  }

  get ticket_url(): string
  {
      return this._ticket_url;
  }

  ticket_urll(id: number): string {

    return this.ticket_urll + id.toString();
  }

  editteticket_url(id: number): string {

    return this._edittickets_url + id.toString();

  }
  editteticket1_url(id: number): string {

    return this._addtocart_url + id.toString();

  }

 deletefromCart_url(id: number): string {

    return this._delete_from_cart + id.toString();

  }

  deleteticket_url(id: number): string {

    return this._deleteticket_url + id.toString();

  }

  get whoami_url(): string {
      return this._whoami_url;
  }

  get users_url(): string {
      return this._users_url;
  }

  get login_url(): string {
      return this._login_url;
  }

  get logout_url(): string {
      return this._logout_url;
  }

  get change_password_url(): string {
      return this._change_password_url;
  }

  get foo_url(): string {
      return this._foo_url;
  }

  get signup_url(): string {
      return this._signup_url;
  }

}
