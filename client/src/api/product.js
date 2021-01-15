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

export const getProductsByCount = async (count) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/products/${count}`
  );
};

export const deleteProduct = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/product/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProduct = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/product/${slug}`
  );
};
