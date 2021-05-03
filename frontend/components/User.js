// anytime when you need user we will use this file huhhhhhh

import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        #todo query the cart count of the user
      }
    }
  }
`;
// without comments i will die
export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  // if there is data return authenticated data other wise null
  return data?.authenticatedItem;
}
