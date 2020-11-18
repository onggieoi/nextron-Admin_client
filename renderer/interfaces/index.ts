export interface Item {
  id: string;
  name: string;
  price: number;
  img: string;
}

export interface Ticket {
  item: Item;
  quantity: number;
  coupon?: string;
  total: number;
}

export interface Coupon {
  id: number;
  code: string;
  discountInPercent: number;
}

export interface Order {
  typeTicket: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface User {
  full_name: string;
  agency_name: string;
  email: string;
}

export interface Product {
  id: string;
  qty: number;
  coupon: string;
}

export interface CreateTicket {
  productData: Product[];
  email: string;
  createTicket: boolean;
  customer: string;
  visitors: string;
  address: string;
  phone: string;
  excel: boolean;
}

export interface OrderOriginal {
  name: string;
  price: number;
  orderOrginal: string;
  isRepresent?: boolean;
  ticketCount?: number;
  ticketInfo: {
    ticketSerial: string;
    productTicketType: number;
    ticketCode: string;
  };
}

export interface TableItem {
  orders_id: string;
  orders_number: string;
  orders_created_at: string;
  orders_ticket_code: string;
  orders_customer_phone: string;
  product_name: string;
  orders_ticket_paid_price: number;
  orders_ticket_is_cancelled: number;
  orders_ticket_serial: string;
  product_ticket_type: number;
}

export interface RePrint {
  name: string;
  type: number;
  price: number;
  serial: string;
  code: string;
}
