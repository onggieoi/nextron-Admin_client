import { createContext } from 'react';
import {
  Ticket,
  Order,
  CreateTicket,
  OrderOriginal,
  RePrint,
} from 'interfaces';

interface Tickets {
  tickets: Ticket[];
}

interface ContextProps extends Tickets {
  add: Function;
  finalPrice: number;
  clear: Function;
  remove: Function;
  type: string;
  details: Order;
  setType: Function;
  setDetails: Function;
  ticketInput: CreateTicket;
  ticketsOrder: OrderOriginal[];
  orderHandle: Function;
  printFirst: any;
  setPrintFirst: any;
  fetch: boolean;
  setFetch: Function;
  rePrintState: RePrint;
  rePrintHandle: Function;
}

export const CartContext = createContext({} as ContextProps);
