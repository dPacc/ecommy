import React, { useState, useEffect } from "react";
import { UserNav } from "../../components";
import { getWishlist, removeWishlist } from "../../api/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [UserWishlist, setUserWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllWishlist();
  }, []);

  const loadAllWishlist = () => {
    setLoading(true);
    getWishlist(user.token).then((res) => {
      setUserWishlist(res.data[0].wishlist);
      // console.log(res.data[0].wishlist);
      setLoading(false);
    });
  };

  const handleRemoveWishlist = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadAllWishlist();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>
          {UserWishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemoveWishlist(p._id)}
              >
                <DeleteOutlined />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
