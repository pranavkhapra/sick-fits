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

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());
// this apollo prop is coming from withData
function MyApp({ Component, pageProps, apollo }) {
  return (
    // injecting apollo client to it
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// we did to get the apollo from the withData component
export default withData(MyApp);
