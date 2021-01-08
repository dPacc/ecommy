import React from "react";
import { UserNav } from "../../components";

const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col">My Wishlist Page</div>
      </div>
    </div>
  );
};

export default Wishlist;
