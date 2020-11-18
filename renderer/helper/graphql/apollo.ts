import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getLocalState } from 'helper/localStorage';

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    bearer: getLocalState('auth')?.token || '',
  },
}));

const httpLink = createHttpLink({
  uri: process.env.URL_GETWAY,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
