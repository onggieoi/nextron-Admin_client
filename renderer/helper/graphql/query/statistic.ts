import { gql } from '@apollo/client';

export const STATISTIC = gql`
  query OrderSatistic($data: OrderStaticInput) {
    orderStatistic(data: $data) {
      orderStatistic {
        orders_id
        orders_number
        orders_created_at
        orders_ticket_code
        orders_customer_phone
        product_name
        orders_ticket_paid_price
        orders_ticket_is_cancelled
        orders_qty
        orders_ticket_serial
        product_ticket_type
      }
      errors {
        message
      }
    }
  }
`;

export const AMOUNTONDAY = gql`
  query OrderSatistic ($data: OrderStaticInput) {
    orderStatistic(data: $data) {
      orderStatistic {
        orders_qty
        orders_ticket_paid_price
      }
      errors {
        message
      }
    }
  }
`;
