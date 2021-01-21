import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";

const SingleProduct = ({ product }) => {
  const { title, images } = product;
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
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br /> Add to cart
            </>,
            <Link to={`/product/wishlist`}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
