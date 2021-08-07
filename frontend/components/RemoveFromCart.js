/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;
// basically now we want to remove the item when we click and its removing but we have to refresh the browser and all so.....
// we can basically use the refetchQueries and all and Cart items and re-render and it\
// but a fast is remove it from cache
// it has access to the cache and the payload info that came back id basically
function update(cache, payload) {
  // cache identity for the id generation and all
  cache.evict(cache.identify(payload.data.deleteCartItem));
}
export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: { id },
      update,
      // it is like it will say i know what comes back from server
      //   and before that i can show a fake info and all
      //   and if the servers response is diff we change it then
      //   optimisticResponse: {
      //     // that comes back
      //     deleteCartItem: {
      //       __typename: 'CartItem',
      //       id,
      //     },
      //   },
    }
  );
  return (
    <>
      <BigButton
        onClick={removeFromCart}
        disabled={loading}
        type="button"
        title="Remove This Item from Cart"
      >
        &times;
      </BigButton>
    </>
  );
}
