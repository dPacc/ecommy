import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    console.log(current);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        Home
      </Item>

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        Register
      </Item>

      <Item key="login" icon={<LoginOutlined />} className="float-right">
        Login
      </Item>

      <SubMenu key="SubMenu" icon={<ProfileOutlined />} title="Profile">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
