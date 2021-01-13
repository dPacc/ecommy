import React, { useState, useEffect } from "react";
import { AdminNav } from "../../components";
import { getProductsByCount } from "../../api/product";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
        <div className="col">Admin Dashboard</div>
        {JSON.stringify(products)}
      </div>
    </div>
  );
};

export default AdminDashboard;
