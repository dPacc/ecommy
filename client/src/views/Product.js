import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/product";
import { SingleProduct } from "../components";

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
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
