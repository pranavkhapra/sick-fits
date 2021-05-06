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
export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: { id },
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
