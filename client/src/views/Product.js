import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/product";

const Product = () => {
  const [product, setProduct] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      console.log(product);
    });
  }, []);

  return (
    <div>
      <h1>Product View</h1>
      {JSON.stringify(product)}
    </div>
  );
};

export default Product;
