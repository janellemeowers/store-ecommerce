import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  //if stripe promise doesn't exist yet, load stripe
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);
  }

  return stripePromise;
};

export default getStripe;
