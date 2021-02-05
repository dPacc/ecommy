import React, { useState, useEffect } from "react";
import {
  getUserCart,
  emptyCart,
  saveUserAddress,
  applyCoupon,
  createCodOrder,
} from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const { user, cod } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

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

    // clear discounts
    setDiscountTotal(0);
    setCoupon("");
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () => (
    <>
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} = {p.product.price}
          </p>
        </div>
      ))}
    </>
  );

  const handleApplyCoupon = () => {
    // console.log("SEND THIS COUPON TO SERVER", coupon);
    applyCoupon(coupon, user.token).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setDiscountTotal(res.data);
        // update redux coupon applied to true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied to true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setDiscountError("");
          setCoupon(e.target.value);
        }}
        type="text"
        className="form-control"
        value={coupon}
      />
      <button onClick={handleApplyCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCOD = () => {
    createCodOrder(user.token, cod, couponTrueOrFalse).then((res) => {
      // console.log("COD ORDER CREATE RESPONSE", res.data);
      if (res.data.ok) {
        // empty user cart from local storage
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("cart");
        }
        // empty user cart from redux store
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // reset coupon to false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty cod redux
        dispatch({
          type: "SET_COD",
          payload: false,
        });
        // empty cart from database
        emptyCart(user.token);
        // redirect user
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products - {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total}</p>

        {discountTotal > 0 && (
          <p className="bg-success p-2">Discount Applied: ${discountTotal}</p>
        )}

        <div className="row">
          <div className="col-md-6">
            {cod ? (
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
                onClick={createCOD}
              >
                Place Order
              </button>
            ) : (
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
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
