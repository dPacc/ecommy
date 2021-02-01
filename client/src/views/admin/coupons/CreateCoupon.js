import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCoupon, removeCoupon, getCoupons } from "../../../api/coupon";
import DatePicker from "react-datepicker";
import { DeleteOutlined } from "@ant-design/icons";
import "react-datepicker/dist/react-datepicker.css";
import { AdminNav } from "../../../components";

const CreateCoupon = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Coupon Create</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
