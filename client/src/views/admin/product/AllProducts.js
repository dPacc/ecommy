import React, { useState, useEffect } from "react";
import { AdminNav, AdminProductCard } from "../../../components";
import { getProductsByCount, deleteProduct } from "../../../api/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      deleteProduct(user.token, slug)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((error) => {
          console.log(error);
          if (error.status.code === 400) toast.error(error.response.data);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 pb-3" key={p._id}>
                <AdminProductCard product={p} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
