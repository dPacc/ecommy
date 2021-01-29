import React, { useState, useEffect } from "react";
import { getProductsByCount, searchFilter } from "../api/product";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "../components";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const dispatch = useDispatch();

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

  const fetchProductsByFilter = (arg) => {
    setLoading(true);
    searchFilter(arg).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // 2. Load product from search filter
  useEffect(() => {
    // add slight delay, to prevent request on every key
    const delay = setTimeout(() => {
      fetchProductsByFilter({ query: text });
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // 3. Fetch products by price range
  useEffect(() => {
    fetchProductsByFilter({ price: price });
  }, [ok]);

  const handleSlider = (val) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice(val);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(val) => `$${val}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
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
