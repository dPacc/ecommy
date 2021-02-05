import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCardInCheckout } from "../components";
import { userCart } from "../api/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currVal, nextVal) => {
      return currVal + nextVal.count * nextVal.price;
    }, 0);
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Quantity</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} product={p} />
      ))}
    </table>
  );

  const saveOrderToDb = (e) => {
    // console.log("SAVE ORDER TO DB", JSON.stringify(cart, null, 4));
    if (e.target.name === "cod") {
      // console.log("YES COD");
      dispatch({
        type: "SET_COD",
        payload: true,
      });
    }
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RESPONSE", res.data);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        console.log("CART SAVE ERROR", err);
      });
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
            showCartItems()
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
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
                name="cod"
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: `/cart` },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
