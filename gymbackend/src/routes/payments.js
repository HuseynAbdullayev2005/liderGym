// routes/payments.js
import { Router } from "express";
import Stripe from "stripe";
import auth from "../middleware/auth.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = Router();
const stripe = new Stripe("sk_test_..."); 


router.post("/create-payment-intent", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("basket.product");
    const total = user.basket.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100, 
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, "whsec_...");
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await Order.findOneAndUpdate(
      { stripePaymentId: paymentIntent.id },
      { status: "completed" }
    );
  }

  res.json({ received: true });
});

export default router;
