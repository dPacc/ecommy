import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;
  return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt={images && images.length ? images[0].public_id : ""}
          />
        }
      >
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default AdminProductCard;
