import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
// help  us in mutation and the upload of the file from frontend to backend the image
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

// first we create a client and eject diff link we have
function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      // the first link is the error handling link
      // it take two diff type of errors graphqlerror---where password was wrong which is helpful to console log
      // network error when backend is down and cors is issue
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      // responsiblefor fetching data and post create and update item post and get request
      // createUploadLink is basically the apollo-link-http with layered up some code to upload file
      createUploadLink({
        // basically it is asking for the end point and production end point saved in config.js
        // end point is graphl api link
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        // when we fetchdata from graphql api we need to have creedentials or cookie to know he is logged in and all
        //
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        // basically when we login it take some time to server to know that we are logged in or not so it shows only the logout and flicker for a sec and all
        // basically when we refresh the page sometime in some cases it shows only logout page and all and then show all the after 1 sec beacuse server dont know that you are login or not so we have to re-render from client site and all about that so we  basically use this
        // after getting all the info we will able to delete that flicker
        headers,
      }),
    ]),
    // cache where we will you save in memory basically in the browser because when we refresh cache is gone
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            // we say don't do it your way of the cache with all the variabel and all let me handle it
            allProducts: paginationField(),
          },
        },
      },
      // it will restore any intital state
      // if there is any intial state restore it other wise go ahead
      // so that we dont hit the api again again and again
    }).restore(initialState || {}),
  });
}
// with apollo crawl allthe data or query await for it till it send it to the server to the client
export default withApollo(createClient, { getDataFromTree });
