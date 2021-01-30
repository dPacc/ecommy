import React, { useState, useEffect } from "react";
import { getProductsByCount, searchFilter } from "../api/product";
import { getCategories } from "../api/category";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard, Star } from "../components";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);

  const [star, setStar] = useState("");

  const dispatch = useDispatch();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts(10);
    //fetch categories
    getCategories().then((res) => {
      setCategories(res.data);
    });
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
    setCheckedCategories([]);
    setPrice(val);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. Load products based on category
  // show category list to user
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={checkedCategories.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for checkboxes
  const handleCheck = (e) => {
    // clear other filter values
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);

    let inTheState = [...checkedCategories];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCheckedCategories(inTheState);
    fetchProductsByFilter({ category: inTheState });
  };

  // 5. Shpw products by star rating
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleStarClick = (num) => {
    // clear other filter values
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategories([]);

    setStar(num);
    fetchProductsByFilter({ stars: num });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu mode="inline" defaultOpenKeys={["1", "2", "3"]}>
            {/* Price */}
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

            {/* Categories */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* Ratings */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
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
