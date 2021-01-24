import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, updateProductRating } from "../api/product";
import { SingleProduct } from "../components";
import { useSelector } from "react-redux";

const Product = () => {
  const [product, setProduct] = useState("");
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, []);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
    });
  };

  const handleChangeRating = (newRating, name) => {
    setStar(newRating);
    updateProductRating(user.token, name, newRating).then((res) => {
      loadSingleProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          star={star}
          handleChangeRating={handleChangeRating}
        />
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
