// setting up the stripe in the backend--
import Stripe from 'stripe';

const stripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});

export default stripeConfig;
