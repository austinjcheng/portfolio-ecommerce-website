const Stripe = require("stripe");
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);
const products = require("./products.json");

exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find((p) => p.id === id);
    return {
      ...product,
      qty,
    };
  });

  console.log(cartWithProducts);
  const lineItems = cartWithProducts.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `/success`,
    cancel_url: `/cancelled`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
