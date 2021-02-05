import axios from "axios";

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
};

export const saveUserAddress = async (address, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// apply discount
export const applyCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// create order
export const createOrder = async (authtoken, paymentIntent) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/order`,
    paymentIntent,
    {
      headers: {
        authtoken,
      },
    }
  );
};

// Get user orders
export const getUserOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });
};

// Wishlist
export const getWishlist = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });
};

export const removeWishlist = async (productId, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addWishlist = async (productId, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

// create cod order
export const createCodOrder = async (authtoken, cod, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/cash-order`,
    { couponApplied: coupon, cod },
    {
      headers: {
        authtoken,
      },
    }
  );
};
