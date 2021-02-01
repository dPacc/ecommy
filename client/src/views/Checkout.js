import React, { useState, useEffect } from "react";
import { getUserCart, emptyCart } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const handleEmptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // remove from backend
    emptyCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue Shopping!");
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        Text Area
        <button className="btn btn-primary mt-2">Save</button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        Coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products - {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} = {p.product.price}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: ${total}</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={handleEmptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
