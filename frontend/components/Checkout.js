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
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;
// loading stripe in to the page
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
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
    // the paymentMethod have the token and all
    // we can check this and all from this one
    // stripe test cards
    // no authenticated required
    // 4242 4242 4242 4242 02/22 222 22222
    // also  you can try like diff a error one with
    // 4000 0084 0000 1280 for error checking
    // and then you will have the info that come back from stripe we needed the id or token
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    // 6. Change the page to view the order
    // 7. Close the cart
    // 8. turn the loader off
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
