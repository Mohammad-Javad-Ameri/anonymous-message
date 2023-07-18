import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { BsUiChecksGrid } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";

export default function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className=" border-r hidden sm:block relative">
      <div className="btn flex  " type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Menu
        className="bg-inherit   selection:text-transparent"
        mode="inline"
        inlineCollapsed={collapsed}
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/dashboard",
          },
          {
            label: "Messages",
            key: "/messages",
            icon: <BiMessageDetail />,
          },
          {
            label: "Polls (Coming Soon)",
            key: "/polls",
            icon: <BsUiChecksGrid />,
          },
          {
            label: "Rates (Coming Soon)",
            key: "/ratings",
            icon: <AiOutlineStar />,
          },
        ]}
      ></Menu>
    </div>
  );
}
