import axios from "axios";

export const createPaymentIntent = (authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API}/create-payment-intent`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
