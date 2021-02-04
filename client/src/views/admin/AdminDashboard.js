import React, { useState, useEffect } from "react";
import { AdminNav, Orders } from "../../components";
import { getAllOrders, updateOrderStatus } from "../../api/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () => {
    setLoading(true);
    getAllOrders(user.token).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  };

  const handleOrderStatusUpdate = (orderId, orderStatus) => {
    setLoading(true);
    updateOrderStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Order status changed");
      setLoading(false);
      loadAllOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Dashboard</h4>
          <Orders
            orders={orders}
            handleStatusChange={handleOrderStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
