import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/product";
import { ProductCard, Jumbotron, LoadingCard } from "../../components";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", 3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} loading={loading} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewArrivals;
