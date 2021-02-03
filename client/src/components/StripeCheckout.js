import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../api/stripe";
import { Link } from "react-router-dom";

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    createPaymentIntent(user.token)
      .then((res) => {
        // console.log("CREATE PAYMENT INTENT", res.data);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // Here you get result after successful payment
      // Create order and save to db for admin to process
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = (e) => {
    // disable pay button if there are any errors
    setDisabled(e.empty);
    // show error messages
    setError(e.error ? e.error.message : "");
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment Successful.{" "}
        <Link to="/user/history">Check in your purchase history</Link>
      </p>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="cart-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="text-danger" role="alert">
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default StripeCheckout;
