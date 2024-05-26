import express from "express";
import stripeController from "./../controller/stripe.controller.js";
import Stripe from "stripe";
import orderService from "../service/order.service.js";

export default function (app: any, stripe: Stripe) {
  const jsonMiddleware = express.json();

  app.post("/create-checkout-session", jsonMiddleware, (req: any, res: any) => {
    stripeController.createCheckoutSessionController(req, res, stripe);
  });

  app.post(
    "/webhook-payment",
    express.raw({ type: "application/json" }),
    async (req: any, res: any) => {
      // Vérifiez la signature du webhook
      const sig = req.headers["stripe-signature"];
      let event;

      if (!process.env.STRIPE_WEBHOOK_SECRET)
        return res.status(500).send("No webhook secret.");

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err: any) {
        console.log("Erreur de signature du webhook :", err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // checkout.session.completed = Paiement validé
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        await orderService.updateOrderByStripeId(session.id, {
          status: "paid",
        });

        return res.status(200).end();
      }

      res.status(400).send("Event not listened.");
    }
  );
}
