import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../api/product";
import { ProductCard } from "../components";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="jumbotron">
        {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
