import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./image/logo.png";
import {
  WechatOutlined,
  CoffeeOutlined,
  DollarCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getRequest } from "../hooks/api";
import { useHistory } from "react-router";

const NavBarStyle = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

const LogoutStyle = styled(LogoutOutlined)`
  font-size: 30px;
  margin-bottom: 20px;
  &:hover {
    color: #0d5cb6; // <Thing> when hovered
  }
`;

export default function NavBar() {
  const history = useHistory();
  const [current, setCurrent] = useState("drink");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getUserName = async () => {
      try {
        let name = await getRequest("/getusername");
        setUsername(name.username);
      } catch (error) {
        console.log(error);
        history.push("/login");
      }
    };
    getUserName();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <NavBarStyle>
      <div>
        <img style={{ height: "50px" }} src={logo} alt="logo"></img>
      </div>
      <div>
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          onClick={(e) => setCurrent(e.key)}
        >
          <Menu.Item key="drink" icon={<CoffeeOutlined />}>
            <Link to={"/"}>Gọi Đồ Ăn</Link>
          </Menu.Item>
          <Menu.Item key="chat" icon={<WechatOutlined />}>
            <Link to={"/chat"}>Nhắn tin</Link>
          </Menu.Item>
          <Menu.Item key="money" icon={<DollarCircleOutlined />}>
            <Link to={"/money"}>Nạp Tiền</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <p style={{ fontSize: "30px" }}>{username}</p>
        <LogoutStyle onClick={handleLogout} />
      </div>
    </NavBarStyle>
  );
}