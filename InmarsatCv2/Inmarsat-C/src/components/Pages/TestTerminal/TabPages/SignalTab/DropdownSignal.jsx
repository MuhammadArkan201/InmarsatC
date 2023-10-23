// import React from "react";
import {
  DownOutlined,
  SearchOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import "../../../../../App.css";
import { Dropdown, Space } from "antd";

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        View Chart
      </a>
    ),
    icon: <EyeOutlined />,
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Refresh
      </a>
    ),
    icon: <UndoOutlined />,
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Reset Zoom
      </a>
    ),
    icon: <SearchOutlined />,
  },
];

function DropdownSignal() {
  return (
    <div>Inmarsat-C Terminal Signal Level <Space></Space>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default DropdownSignal;
