import React, { useEffect, useState } from "react";
import { UserNav, ShowPaymentInfo, Invoice } from "../../components";
import { getUserOrders } from "../../api/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
      console.log(res.data);
    });
  };

  const showEachOrders = () =>
    orders.reverse().map((o, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={o} />
        {showOrderInTable(o)}
        <div className="row">
          <div className="col">{showDownloadLink(o)}</div>
        </div>
      </div>
    ));

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td> {p.product.price}</td>
            <td> {p.product.brand}</td>
            <td> {p.color}</td>
            <td> {p.count}</td>
            <td>
              {" "}
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col text-center">
          {orders.length > 0 ? (
            <h4>Previous orders</h4>
          ) : (
            <h4>No orders yet</h4>
          )}

          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
