import axios from "axios";

export const createProduct = async (authtoken, product) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/product`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/products`);
};
