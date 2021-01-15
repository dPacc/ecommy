import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt={"laptop"}
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleRemove(slug)}
          />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 50)}...`}
        />
      </Card>
    </>
  );
};

export default AdminProductCard;
