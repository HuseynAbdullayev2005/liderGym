// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutPage.css";

function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Test User" },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setPaymentSucceeded(true);
      }
    } catch (err) {
      setError("Payment processing failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="checkout_page">
      <h2>Checkout</h2>
      {paymentSucceeded ? (
        <div className="success_message">Payment succeeded!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement options={{ hidePostalCode: true }} />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : "Pay"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
}

export default CheckoutPage;
