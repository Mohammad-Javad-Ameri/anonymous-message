import { BellFilled, MailOutlined } from "@ant-design/icons";
import { BsPersonFill } from "react-icons/bs";
import { Badge, Drawer, Image, List, Typography } from "antd";
import { useEffect, useState, useContext } from "react";
import DarkMode from "./Darkmode";
import MobileNav from "./MobileNav";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Headerr() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [open, setOpen] = useState(false);
 
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMobileNav = () => {
    setOpen(!open);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // useEffect(() => {
  //   getComments().then((res) => {
  //     setComments(res.comments);
  //   });
  //   getOrders().then((res) => {
  //     setOrders(res.products);
  //   });
  // }, []);

  return (
    <div className="navbar  border-b top-0  sticky bg-base-100 z-[100]    px-4 py-2 ">
      <div className="navbar-start">
        <Image width={40} src={logo}></Image>
        <MobileNav open={open} toggleMobileNav={toggleMobileNav} />
      </div>
      <div className="navbar-center">
        <div className="pt-2 text-[30px] max-sm:text-[19px] text-violet-500"></div>
      </div>
      <div className="navbar-end">
        <DarkMode />
        {user ? (
          <>
            <Badge count={comments.length} dot>
              <MailOutlined
                className="text-2xl btn btn-square btn-ghost "
                onClick={() => {
                  setCommentsOpen(true);
                }}
              />
            </Badge>
            <Badge count={orders.length}>
              <BellFilled
                className="text-2xl btn btn-square btn-ghost "
                onClick={() => {
                  setNotificationsOpen(true);
                }}
              />
            </Badge>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="text-2xl p-3 btn btn-ghost rounded-btn"
              >
                <BsPersonFill />
              </label>
              <ul
                tabIndex={0}
                className="menu cursor-pointer dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li onClick={logOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login" class="py-1 pr-2">
            <button className="btn btn-outline ml-1">Login</button>
          </Link>
        )}
        <Drawer
          title="Comments"
          open={commentsOpen}
          onClose={() => {
            setCommentsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={comments}
            renderItem={(item) => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          open={notificationsOpen}
          onClose={() => {
            setNotificationsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={orders}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Typography.Text strong>{item.title}</Typography.Text> has
                  been ordered!
                </List.Item>
              );
            }}
          ></List>
        </Drawer>
      </div>
    </div>
  );
}
