import React, { useState, useEffect } from "react";
import { getProducts } from "../../../api/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsList();
  }, []);

  const productsList = () => {
    getProducts()
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Product List page</h1>
      {products.map((p) => (
        <>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
          <p>
            {p.category ? <p>Yes - {p.category} </p> : <p>No</p>} Category ID
          </p>
          <p>{p.brand}</p>
          <img src={p.images} />
          <p>{p.color}</p>
          <p>{p.shipping}</p>
        </>
      ))}
    </div>
  );
};

export default ProductList;
