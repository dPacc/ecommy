import React, { useState, useEffect } from "react";
import { getProductsByCount, searchFilter } from "../api/product";
import { getCategories } from "../api/category";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard, Star } from "../components";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getSubcategories } from "../api/subcategory";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [checkedSubCategories, setCheckedSubCategories] = useState([]);
  const [star, setStar] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Lenovo",
    "Samsung",
    "Microsoft",
    "ASUS",
    "MSI",
    "HP",
    "Acer",
  ]);
  const [clickedBrand, setClickedBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "Blue",
    "White",
  ]);
  const [checkedColor, setCheckedColor] = useState("");
  const [shipping, setShipping] = useState(["Yes", "No"]);
  const [checkedShipping, setCheckedShipping] = useState("");

  const dispatch = useDispatch();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts(10);
    //fetch categories
    getCategories().then((res) => {
      setCategories(res.data);
    });
    // fetch subcategories
    getSubcategories().then((res) => {
      setSubCategories(res.data);
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
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // 3. Fetch products by price range
  useEffect(() => {
    fetchProductsByFilter({ price: price });
  }, [ok]);

  const handleSlider = (val) => {
    // Clear other filters
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setCheckedCategories([]);
    setStar("");
    setCheckedSubCategories([]);
    setClickedBrand("");
    setCheckedColor("");
    setCheckedShipping("");

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
    setStar("");
    setCheckedSubCategories([]);
    setClickedBrand("");
    setCheckedColor("");
    setCheckedShipping("");

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

  // 5. Show products by star rating
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
    setCheckedCategories([]);
    setCheckedSubCategories([]);
    setClickedBrand("");
    setCheckedColor("");
    setCheckedShipping("");

    setStar(num);
    fetchProductsByFilter({ stars: num });
  };

  // 6. Show products by sub category
  const showSubCategories = () =>
    subCategories.map((s) => (
      <div
        key={s._id}
        className="p-1 m-1 badge badge-secondary"
        onClick={() => handleSubCatSubmit(s)}
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSubCatSubmit = (s) => {
    // clear other filter values
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategories([]);
    setStar("");
    setClickedBrand("");
    setCheckedColor("");
    setCheckedShipping("");

    setCheckedSubCategories(s);
    fetchProductsByFilter({ subcategory: s });
  };

  // 7. Show products by brands
  const showBrands = () =>
    brands.map((br) => (
      <Radio
        key={br}
        value={br}
        name={br}
        checked={br === clickedBrand}
        onChange={handleBrandSubmit}
        className="pb-2 pl-4 pr-4"
      >
        {br}
      </Radio>
    ));

  const handleBrandSubmit = (e) => {
    // clear other filter values
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategories([]);
    setCheckedSubCategories([]);
    setStar("");
    setCheckedColor("");
    setCheckedShipping("");

    setClickedBrand(e.target.value);
    fetchProductsByFilter({ brand: e.target.value });
  };

  // 8. Filter products by color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        key={c}
        checked={c === checkedColor}
        onChange={handleColorSubmit}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColorSubmit = (e) => {
    // clear other filter values
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategories([]);
    setCheckedSubCategories([]);
    setStar("");
    setCheckedShipping("");

    setCheckedColor(e.target.value);
    fetchProductsByFilter({ color: e.target.value });
  };

  // 9. Filter products by shipping
  const showShipping = () =>
    shipping.map((s) => (
      <Radio
        value={s}
        name={s}
        key={s}
        checked={s === checkedShipping}
        onChange={handleShippingSubmit}
        className="pb-1 pl-4 pr-4"
      >
        {s}
      </Radio>
    ));

  const handleShippingSubmit = (e) => {
    // clear other filter values
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategories([]);
    setCheckedSubCategories([]);
    setStar("");
    setCheckedColor("");

    setCheckedShipping(e.target.value);
    fetchProductsByFilter({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
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

            {/* Subcategories */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Sub-Categories
                </span>
              }
            >
              <div className="pl-4 pr-4" style={{ marginTop: "-10px" }}>
                {showSubCategories()}
              </div>
            </SubMenu>

            {/* Brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Brands
                </span>
              }
            >
              <div className="h6" style={{ marginTop: "-10px" }}>
                {showBrands()}
              </div>
            </SubMenu>

            {/* Colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Color
                </span>
              }
            >
              <div className="h6" style={{ marginTop: "-10px" }}>
                {showColors()}
              </div>
            </SubMenu>

            {/* Colors */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Shipping
                </span>
              }
            >
              <div className="h6" style={{ marginTop: "-10px" }}>
                {showShipping()}
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
