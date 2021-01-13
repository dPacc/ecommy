import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../../api/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsList();
  }, []);

  const count = 10;

  const productsList = () => {
    getProductsByCount(count)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Product List page</h1>

      {/* {JSON.stringify(products[0].category.name)} */}
    </div>
  );
};

export default ProductList;
