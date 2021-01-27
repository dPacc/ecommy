import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subcategories,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      <li className="list-group-item">
        Category
        <Link
          to={`/category/${category && category.name}`}
          className="label label-default label-pill pull-xs-right"
        >
          {category && category.name}
        </Link>
      </li>

      {subcategories && (
        <li className="list-group-item">
          Subcategories{" "}
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              to={`/subcategory/${sub && sub.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {sub.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        Brand
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Available
        <span className="label label-default label-pill pull-xs-right">
          Only {quantity} left
        </span>
      </li>

      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
