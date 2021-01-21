import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <>
      <div className="col-md-7">Image</div>
      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined
                className="text-success"
                onClick={() => console.log(slug)}
              />
              <br /> Add to cart
            </>,
            <Link to={`/product/wishlist`}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
          <p>{product.price}</p>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
