import React, { useState, useEffect } from "react";
import { getProductsByCount, searchFilter } from "../api/product";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "../components";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts(10);
  }, []);

  // 1. Load products on page load
  const loadAllProducts = (count) => {
    setLoading(true);
    getProductsByCount(count)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // 2. Load product from search filter
  useEffect(() => {
    // add slight delay, to prevent request on every key
    const delay = setTimeout(() => {
      fetchProductsByFilter(text);
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const fetchProductsByFilter = (text) => {
    setLoading(true);
    searchFilter(text).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">Search / Filter Menu</div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
