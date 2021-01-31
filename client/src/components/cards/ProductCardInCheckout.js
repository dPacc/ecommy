import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";

const ProductCardInCheckout = ({ product }) => {
  const colors = ["Black", "Brown", "Silver", "Blue", "White"];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    // console.log("COLOR CHANGE", e.target.value);
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((pr, index) => {
        if (pr._id === product._id) {
          cart[index].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto", alignItems: "center" }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>$ {product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select
            name="color"
            onChange={handleColorChange}
            className="form-control"
          >
            {product.color ? (
              <option value={product.color}>{product.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>{product.count}</td>
        <td>Shipping Icon</td>
        <td>Remove Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
