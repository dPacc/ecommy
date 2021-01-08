import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";

const UserRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      {user && user.token ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default UserRoute;
