import React, { useEffect, useState } from "react";
import { UserNav } from "../../components";
import { getUserOrders } from "../../api/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col">User History Page</div>
      </div>
    </div>
  );
};

export default History;
