import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";
import { currentAdmin } from "../../api/auth";

const AdminRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((result) => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      {ok && user.token ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default AdminRoute;
