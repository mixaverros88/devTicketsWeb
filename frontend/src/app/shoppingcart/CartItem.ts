// tslint:disable-next-line:one-line
import { Ticket } from '../tickets-crud/ticket';

export interface CartItem {
    ticket: Ticket;
    itemQuantity: number;

}
