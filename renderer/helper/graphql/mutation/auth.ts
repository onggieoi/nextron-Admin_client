import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation ($data: SignInInput!) {
  dalatSignIn(data: $data) {
    agencyAccount {
      id
      email
      full_name
      agency_name
      token
    }
    errors {
      field
      message
    }
  }
}
`;

export const LOGOUT = gql`
mutation logoutAgency {
  logoutAgency
}
`;
