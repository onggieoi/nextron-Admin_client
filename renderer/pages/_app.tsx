import React from 'react';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

import { CartProvider } from '../contexts/cart/cart.provider';
import AuthProvider from '../contexts/auth/auth.provider';
import { client } from '../helper/graphql/apollo';
import Auth from '../containers/Auth/index';

import '@redq/reuse-modal/lib/index.css';
import 'styles/app.scss';
import 'nprogress/nprogress.css';
import 'react-datepicker/dist/react-datepicker.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={ client }>
      <AuthProvider>
        <CartProvider>
          <Auth>
            <Component { ...pageProps } />
          </Auth>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
