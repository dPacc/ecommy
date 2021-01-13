import React from "react";
import { AdminNav } from "../../components";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
