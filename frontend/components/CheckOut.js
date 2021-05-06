// steps------
// first we capture the user card info
// send it to the stripe it will send the token
// and we will send the tokenn to server side
// and the process to payment...
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
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

export default function CheckOut() {
  function handleSubmit(event) {
    // we have done so far now we want to basically
    //  do the talking to stipe and the token getting and then sending to server.
    event.preventDefault();
    console.log('to do');
  }
  return (
    <>
      {/* we have apollo provider that provide apollo thing and */}
      {/* cart provider that open cart and all
    and the strip elements provider 
    that provide info about that
    */}
      <Elements stripe={stripeLib}>
        <CheckoutFormStyles onSubmit={handleSubmit}>
          {/* //the basically the enter the card number mm/yy/cc */}
          <CardElement />
          <SickButton>Check Out Now</SickButton>
        </CheckoutFormStyles>
      </Elements>
    </>
  );
}
