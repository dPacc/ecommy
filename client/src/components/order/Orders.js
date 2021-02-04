import React from "react";
import { CheckCircledOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ShowPaymentInfo } from "../../components";

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} />
            <div className="row">
              <div className="col-md-4 h6">Delivery Status</div>
              <div className="col-md-8">
                <select
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
