import axios from "axios";

export const createPaymentIntent = (coupon, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};
