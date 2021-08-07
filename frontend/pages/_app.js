/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Nprogress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

import Page from '../components/Page';
// todo swap with your own your own nprogress
// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());
// this apollo prop is coming from withData
function MyApp({ Component, pageProps, apollo }) {
  return (
    // injecting apollo client to it
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}
// now we need nextjs to know it need to fetch all the query that are in the children component
// ctx is context
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    // if any of the page have getInitialProps which they will have because thats what withData is adding to them then we are going to wait and fetch it
    pageProps = await Component.getInitialProps(ctx);
  }
  // it will basically aloow us to get any query variable /product/2 type
  pageProps.query = ctx.query;
  return { pageProps };
};
// we did to get the apollo from the withData component
export default withData(MyApp);
