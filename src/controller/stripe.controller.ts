import { Stripe } from "stripe";
import { StripeCheckoutDto } from "../dto/stripe.dto.js";

async function createCheckoutSessionController(request: StripeCheckoutDto, res: any, stripe: Stripe) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: request.productName,
              description: request.productDescription
            },
            unit_amount: request.productPrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://yartisan.netlify.app",
      cancel_url: "https://yartisan.netlify.app",
    });

    const paymentUrl = `https://checkout.stripe.com/pay/${session.id}`;

    res.json({ paymentUrl: paymentUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur est survenue lors de la création de la session de paiement." });
  }
}

export default {
  createCheckoutSessionController,
};
