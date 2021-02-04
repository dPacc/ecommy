import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import { showAverage } from "../../api/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../../api/user";

// modal component
import RatingModal from "../modal/RatingModal";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, star, handleChangeRating }) => {
  const history = useHistory();
  const { title, images, description, _id, quantity } = product;
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage, get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save item to local storage
      // console.log(unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // Show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    addWishlist(_id, user.token).then((res) => {
      toast.success(`${title} added to wishlist`);
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.length ? (
            images.map((i) => <img src={i.url} alt="img1" key={i.public_id} />)
          ) : (
            <Card
              cover={
                <img src={Laptop} className="mb-3 card-image" alt={"laptop"} />
              }
            ></Card>
          )}
        </Carousel>
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>

          <TabPane tab="More" key="2">
            Contact us on XXXX-XXXX-XX for more info
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No ratings yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} disabled={quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br /> {quantity < 1 ? "Out of stock" : "Add to cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
              <StarRatings
                starRatedColor="gold"
                numberOfStars={5}
                changeRating={handleChangeRating}
                rating={star}
                name={_id}
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
