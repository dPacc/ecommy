import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../api/product";
import { AdminProductCard } from "../components";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(1).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="col">
        {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 pb-3" key={p._id}>
              <AdminProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
