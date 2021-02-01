import React, { useState, useEffect } from "react";
import { getUserCart } from "../api/user";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const saveAddressToDb = () => {
    //
  };

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        Text Area
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
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
            <button className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
