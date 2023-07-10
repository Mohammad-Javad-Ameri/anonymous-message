import { MailOutlined } from "@ant-design/icons";
import { BsPersonFill } from "react-icons/bs";
import { Badge, Drawer, Image, List } from "antd";
import { useEffect, useState } from "react";
import DarkMode from "./Darkmode";
import MobileNav from "./MobileNav";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { fetchConversations } from "../../Api/Api";
import { useAuth } from "../../context/AuthProvider";

import { useNavigate } from "react-router-dom";

export default function Headerr() {
  const navigate = useNavigate();
  const { conversationChangeCount } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const [seenComments, setSeenComments] = useState(
    JSON.parse(localStorage.getItem("seenComments") || "false")
  );
  const toggleMobileNav = () => {
    setOpen(!open);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    if (token) {
      fetchConversations(1, 100, token).then((res) => {
        const titles = res.map((conversation) => conversation.title);
        setComments(titles);
        if (!seenComments && titles.length > 0) {
          setSeenComments(true);
          localStorage.setItem("seenComments", JSON.stringify(true));
        }
      });
    }
  }, [conversationChangeCount]);

  return (
    <div className="navbar  border-b top-0  sticky bg-base-100 z-[100]    px-4 py-2 ">
      <div className="navbar-start">
        <Image width={40} src={logo}></Image>
        <MobileNav open={open} toggleMobileNav={toggleMobileNav} />
      </div>
      <div className="navbar-center">
        <div className="pt-2 text-[30px] max-sm:text-[19px]">
          <div className=" sm:flex flex-1 hidden justify-center items-center">
            <Link to="/" className="btn btn-ghost mx-2">
              Home
            </Link>
            {user && (
              <Link to="/dashboard" className="btn btn-ghost mx-2">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <DarkMode />
        {user ? (
          <>
            <Badge count={!seenComments ? comments.length : 0} dot>
              <MailOutlined
                className="text-2xl btn btn-square btn-ghost "
                onClick={() => {
                  setSeenComments(true);
                  localStorage.setItem("seenComments", JSON.stringify(true));
                  setCommentsOpen(true);
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
              return <List.Item>{item}</List.Item>;
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
        ></Drawer>
      </div>
    </div>
  );
}
