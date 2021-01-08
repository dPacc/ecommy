import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      {user && user.token ? (
        <Route {...restProps} render={children} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default UserRoute;
