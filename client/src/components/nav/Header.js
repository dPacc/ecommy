import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");

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

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>

      <Item key="login" icon={<LoginOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu key="SubMenu" icon={<ProfileOutlined />} title="Profile">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} key="logout" onClick={handleLogout}>
          Logout
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
