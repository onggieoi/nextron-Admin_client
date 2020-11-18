import { gql } from '@apollo/client';

export const CHECK = gql`
mutation CheckTicket($data: TicketCodeInput!) {
  checkTicket(data: $data) {
    ordersTicketData {
      id
      paidPrice
      code
      orderNumber
      orderOriginal
      orderCreateAt
      productId
      productName
      customerId
      customerName
      customerPhone
      customerEmail 
      ticketSerial
      productTicketType
      ticketCode
      isCancelled
      gate
      stateCheck{
        nameGate
        agency
        checkNumber
      }
    }
    orderPreOrder {
      productName
      productAvailableAt
      productExpireAt
      productTicketType
      agencyAdress
      agencyProvince
      agencyDistrict
      agencyName
      agencyPhone
      agnecyEmail
    }
    checkInAt
    message
  }
}
`;

export const ACTIVE = gql`
mutation ActiveTicket ($data: TicketCodeInput!) {
  activeTicket (data: $data) {
    status
    message
  }
}
`;

export const CREATE_TICKET = gql`
mutation CreateTicket ($data: CreateOrderInput!) {
  createTicket(data: $data) {
    ordersOriginal
    createTicket
    excel
    visitor
    iSuccess
    message
    ticketInfo {
      ticketSerial
      productTicketType
      ticketCode
    }
    errors {
      id
      productName
      outStock
      couponUsed
    }
  }
}
`;

export const CHECK_ORDER = gql`
mutation CheckOrder($data: OrderCodeInput!) {
  checkOrder(data: $data) {
    ordersTicketData {
      id
      paidPrice
      code
      orderNumber
      orderOriginal
      orderCreateAt
      productId
      productName
      ticketSerial
      productTicketType
      ticketCode
      isCancelled
      customerName
      customerPhone
      customerEmail
      gate
      stateCheck {
        nameGate
        agency
        checkNumber
      }
    }
  }
}
`;

export const COUPON = gql`
mutation CheckPromotion($data: PromotionInput!) {
  checkPromotion(data: $data) {
    status
    newPrice
  }
}
`;

export const CANCEL_TICKET = gql`
  mutation CancelTicket($data: CancelTicketInput!) {
    cancelTicket(data: $data){
      message
      success
    }
  }
`;

export const CHECK_PROMOTO = gql`
  mutation CheckPromotion ($data: PromotionInput!) {
    checkPromotion(data: $data) {
      status
      newPrice
    }
  }
`;
