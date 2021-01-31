import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currVal, nextVal) => {
      return currVal + nextVal.count * nextVal.price;
    }, 0);
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart - {cart.length} Products</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping!</Link>
            </p>
          ) : (
            "Show Cart Items"
          )}
        </div>

        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button className="btn btn-sm btn-primary mt-2">
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
