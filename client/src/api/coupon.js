import axios from "axios";

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/coupons`);
};

export const removeCoupon = async (couponId, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/coupon`,
    coupon,
    {
      headers: {
        authtoken,
      },
    }
  );
};
