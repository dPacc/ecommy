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
