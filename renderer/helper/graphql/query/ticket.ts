import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query {
    categories {
      category {
        id
        name
      }
      errors {
        message
      }
    }
  }
`;

export const TICKETS = gql`
  query tickets($category: CategoryInput!) {
    tickets(category: $category) {
      products {
        id
        name
        price
        banner
        availAt
        expireAt
        type
      } 
      errors {
        message
      }
    }
  }
`;
