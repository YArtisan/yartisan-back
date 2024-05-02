import express from "express";
import stripeController from "./../controller/stripe.controller.js";
import Stripe from "stripe";

export default function (app: any, stripe: Stripe) {
  const jsonMiddleware = express.json();

  app.post('/create-checkout-session', jsonMiddleware, (req: any, res: any) => {
    stripeController.createCheckoutSessionController(req, res, stripe)
  })

  app.post("/webhook-payement", jsonMiddleware, async (req: any, res: any) => {
    // Vérifiez la signature du webhook
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, 'votre_webhook_secret');
    } catch (err) {
      console.log('Erreur de signature du webhook :', err);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    // Gérer l'événement checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Effectuez les opérations nécessaires après un paiement réussi
      console.log('Paiement validé :', session.id);

      // Répondre à Stripe pour indiquer que le webhook a été traité avec succès
      res.status(200).end();
    }
  });
}
