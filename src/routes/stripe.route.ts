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
      console.log("signature", sig);

      let event;
      console.log("body", req.rawBody);

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          sig,
          "whsec_c26d060a403ba3630ba47eb013980fbfacb94a44ff5efd588b54f7e634c4653b"
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
