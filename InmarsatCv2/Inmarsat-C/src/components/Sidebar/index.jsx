// import React from "react";
import { Menu } from "antd";
import {
  StockOutlined,
  SearchOutlined,
  MenuOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleMenuItemClick = (key) => {
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      className="Sidebar"
      onClick={({ key }) => handleMenuItemClick(key)}
    >
      <Menu.Item key="/sidebar1" icon={<MenuOutlined />}></Menu.Item>
      <Menu.Item key="/sidebar2" icon={<AppstoreOutlined />}></Menu.Item>
      <Menu.Item key="/sidebar3" icon={<StockOutlined />}></Menu.Item>
      <Menu.Item key="/sidebar4">GX</Menu.Item>
      <Menu.Item key="/sidebar5" icon={<BookOutlined />}></Menu.Item>
      <Menu.Item key="/sidebar6" icon={<SearchOutlined />}></Menu.Item>
      <Menu.Item key="/sidebar7" icon={<SettingOutlined />}></Menu.Item>
      <Menu.Item key="/TestTerminal" icon={<PhoneOutlined />}></Menu.Item>
    </Menu>
  );
}

export default Sidebar;
