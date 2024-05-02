import { Stripe } from "stripe";
import { StripeCheckoutDto } from "../dto/stripe.dto.js";
import { Request } from "express";

async function createCheckoutSessionController(
  request: Request,
  res: any,
  stripe: Stripe
) {
  const { body }: { body: StripeCheckoutDto } = request; 
  console.log("body", body);
  
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: body.productName,
              description: body.productDescription,
            },
            unit_amount: body.productPrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://yartisan.netlify.app",
      cancel_url: "https://yartisan.netlify.app",
    });

    const paymentUrl = `https://checkout.stripe.com/pay/${session.id}`;

    res.json({ paymentUrl: session.url });
    // res.json({ paymentUrl: " " });
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
