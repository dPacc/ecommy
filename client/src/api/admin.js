import axios from "axios";

export const getAllOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });
};

export const updateOrderStatus = async (orderId, orderStatus, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
};
