import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Item,
  Order,
  CreateTicket,
  OrderOriginal,
  RePrint,
} from 'interfaces';
import { typePrintFirst } from 'helper/constant';
import { CartContext } from './cart.context';

const initialDetails: Order = {
  typeTicket: 'single',
  name: '',
  address: '',
  email: '',
  phone: '',
};

export const CartProvider = (props: any) => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [type, setType] = useState(typePrintFirst);
  const [details, setDetails] = useState(initialDetails);
  const [ticketInput, setTicketInput] = useState({} as CreateTicket);
  const [ticketsOrder, setTicketOrder] = useState([] as OrderOriginal[]);
  const [printFirst, setPrintFirst] = useState({});
  const [fetch, setFetch] = useState(false);
  const [rePrintState, setRePrint] = useState({} as RePrint);

  useEffect(() => {
    let total = 0;
    tickets.forEach((item) => {
      total += item.total;
    });
    setFinalPrice(total);
    setTicketInput({
      productData: tickets.map(((ticket) => ({
        id: ticket.item.id,
        qty: ticket.quantity,
        coupon: ticket.coupon || '',
      }))),
      createTicket: false,
      email: details.email || '',
      customer: details.name || '',
      visitors: details.name || '',
      address: details.address || '',
      phone: details.phone || '',
      excel: false,
    });
  }, [tickets]);

  const add = (item: Item, quantity: number, newPrice?: number, coupon?: string) => {
    let total = item.price * quantity;
    if (newPrice) {
      total = newPrice * quantity;
    }

    if (tickets.length) {
      const index = tickets.findIndex((i) => i.item.id === item.id);
      if (index !== -1) {
        const ticket = tickets[index];
        tickets[index] = {
          ...tickets, ...ticket, quantity, total, coupon,
        };
      } else {
        const ticket: Ticket = {
          item,
          quantity,
          coupon,
          total,
        };
        tickets.push(ticket);
      }
    } else {
      const ticket: Ticket = {
        item,
        quantity,
        coupon,
        total,
      };
      tickets.push(ticket);
    }
    setTickets([...tickets]);
  };

  const remove = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.item.id !== id));
  };

  const clear = () => {
    setTickets([] as Ticket[]);
    setType(typePrintFirst);
    setDetails(initialDetails);
    setTicketOrder([] as OrderOriginal[]);
  };

  const orderHandle = (orderOrigin: [string], ticketInfo: [{
    ticketSerial: string;
    productTicketType: number;
    ticketCode: string;
  }], isRepresent: boolean) => {
    if (isRepresent) {
      const newOrderTicket: OrderOriginal = {
        isRepresent: true,
        ticketCount: tickets[0].quantity,
        name: tickets[0].item.name,
        price: tickets[0].total,
        orderOrginal: orderOrigin[0],
        ticketInfo: {
          ...ticketInfo[0],
          ticketCode: orderOrigin[0],
        },
      };
      ticketsOrder.push(newOrderTicket);
    } else {
      tickets.forEach((ticket) => {
        for (let i = 0; i < ticket.quantity; i += 1) {
          const newOrderTicket: OrderOriginal = {
            name: ticket.item.name,
            price: ticket.total / ticket.quantity,
            orderOrginal: orderOrigin[0],
            ticketInfo: ticketInfo[ticketsOrder.length],
          };
          ticketsOrder.push(newOrderTicket);
        }
      });
    }
    setTicketOrder([...ticketsOrder]);
  };

  const rePrintHandle = (item: RePrint) => {
    setRePrint(item);
  };

  return (
    <CartContext.Provider
      value={{
        tickets,
        add,
        finalPrice,
        clear,
        remove,
        type,
        setType,
        setDetails,
        details,
        ticketInput,
        orderHandle,
        ticketsOrder,
        printFirst,
        setPrintFirst,
        fetch,
        setFetch,
        rePrintHandle,
        rePrintState,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
