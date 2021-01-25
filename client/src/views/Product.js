import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, updateProductRating, listRelated } from "../api/product";
import { SingleProduct, ProductCard } from "../components";
import { useSelector } from "react-redux";

const Product = () => {
  const [product, setProduct] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // Load related product
      listRelated(res.data._id).then((res) => {
        setRelatedProducts(res.data);
      });
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

      <div className="row pb-5">
        {relatedProducts.length ? (
          relatedProducts.map((relProd) => (
            <div key={relProd._id} className="col-md-4">
              <ProductCard product={relProd} />
            </div>
          ))
        ) : (
          <div className="text-center col">NO RELATED PRODUCTS FOUND</div>
        )}
      </div>
    </div>
  );
};

export default Product;
