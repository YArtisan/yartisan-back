import { Stripe } from "stripe";
import { Request } from "express";
import orderService from "../service/order.service.js";

async function createCheckoutSessionController(
  request: Request,
  res: any,
  stripe: Stripe
) {
  const { body } = request;
  const { name, description, price, user_id, artisan_id } = body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name,
              description,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://yartisanfr.netlify.app/dashboard",
      cancel_url: "https://yartisanfr.netlify.app/dashboard",
    });

    await orderService.createOrder({
      user_id,
      artisan_id,
      title: name,
      description,
      price: price / 100,
      url: session.url ?? undefined,
      stripeId: session.id,
      status: "waiting",
    });

    res.json({ paymentUrl: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de la session de paiement.",
      error,
    });
  }
}

export default {
  createCheckoutSessionController,
};
