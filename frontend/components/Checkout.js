// steps------
// first we capture the user card info
// send it to the stripe it will send the token
// and we will send the tokenn to server side
// and the process to payment...
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

// order mutation

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

// loading stripe in to the page
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const { closeCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphqlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }

    // we want the token but we dont have a token until the paymentmethod one from
    // create paymentMethod
    // variables: so we will send it later at step 5
  );
  async function handleSubmit(event) {
    // we have done so far now we want to basically
    //  do the talking to stipe and the token getting and then sending to server.

    // Steps-- -

    // 1. Stop the form from submitting and turn the loader one
    // also we need our own loading state not the query or mutation one
    // we need the user to know something is happening so......upto 6 step show him
    event.preventDefault();
    setLoading(true);
    // console.log('to do');
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      // stripe as allow other option debit and all
      type: 'card',
      // the card element and all
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // the paymentMethod have the token and all
    // we can check this and all from this one
    // stripe test cards
    // no authenticated required
    // 4242 4242 4242 4242 02/22 222 22222
    // also  you can try like diff a error one with
    // 4000 0084 0000 1280 for error checking
    // and then you will have the info that come back from stripe we needed the id or token
    // the token from the stripe
    // so now when we do this payment method object having a id sent to the mutation it will do the payment
    // console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    // sending the token now to the mutation upward with the function it contains
    //  YOU CAN EITHER SEND VARIABLE WHEN MUTATION IS DEFINING OR WHEN YOU ARE JUST USING
    // THE FUNCTION GIVE  BY THE USEMUTAATION LATER WHEN THE VARIABLE IS NOT DEFINED YET
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    // 6. Change the page to view the order
    router.push({
      pathName: `/order/[id]`,
      // after the /order we need query
      query: {
        id: order.data.checkout.id,
      },
    });
    // 7. Close the cart
    closeCart();
    // 8. turn the loader off
    setLoading(false);
    nProgress.done();
  }
  return (
    <>
      {/* we have apollo provider that provide apollo thing and */}
      {/* cart provider that open cart and all
    and the strip elements provider 
    that provide info about that
    */}
      {/* // because the provider is down the elements one but we need to useStripe
      up */}
      {/* <Elements stripe={stripeLib}> */}
      <CheckoutFormStyles onSubmit={handleSubmit}>
        {/* //if at step 4 we find the error */}
        {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
        {graphqlError && <p style={{ fontSize: 12 }}>{graphqlError.message}</p>}
        {/* //the basically the enter the card number mm/yy/cc */}
        <CardElement />
        <SickButton>Check Out Now</SickButton>
      </CheckoutFormStyles>
      {/* </Elements> */}
    </>
  );
}
// because the provider is down the elements one but we need to useStripe up

function Checkout() {
  return (
    // now provider is at higher level beacuse its have the childForm as a child
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
