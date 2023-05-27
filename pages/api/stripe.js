import Stripe from "stripe";

//new instance of stripe
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SEC_KEY);

//nextjs needs handler

//similar to express req res
export default async function handler(req, res) {
  //post request
  //try catch
  //copy from stripe docs
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        //create shipping option in Stripe, get custom ID
        shipping_options: [
          { shipping_rate: "shr_1NBtdyHKptY3XYuKvWQy7dwT" },
          { shipping_rate: "shr_1NBtfbHKptY3XYuKDfZtp5Xa" },
        ],
        //adjust array to include image not just image ref
        //uses your project ID
        //req body is where your data is sent
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/jv93lohj/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100, //for cents
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        //if payment sucess go to this page
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from above params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
