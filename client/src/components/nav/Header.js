import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");

  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<ProfileOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user.role === "subscriber" ? (
            <Item key="subscriber">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          ) : (
            <Item key="admin">
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} key="logout" onClick={handleLogout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
