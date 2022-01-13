import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./image/logo.png";
import {
  WechatOutlined,
  CoffeeOutlined,
  BellOutlined,
  DollarCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button, Modal, Badge, message } from "antd";
import { Link } from "react-router-dom";
import { getRequest, postRequest } from "../hooks/api";
import { useHistory } from "react-router";
import { useStore } from "../hooks/useStore";
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
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("drink");
  const { username, setUsername, monneynow, setMonney, count, setCount } = useStore((state) => ({
    username: state.userName,
    setUsername: state.setUserName,
    monneynow: state.monneynow,
    setMonney: state.setMonney,
    count: state.count,
    setCount: state.setCount,
  }));
  useEffect(() => {
    const getUserName = async () => {
      try {
        let name = await getRequest("/user/getuser");
        setUsername(name.username);
        setMonney(name.monney);
      } catch (error) {
        console.log(error);
        history.push("/login");
      }
    };
    getUserName();

    /////////////////////////////////////////////////////////////////////////////////////
    const getCount = async () => {
      setInterval(async () => {
        let count = await getRequest("/noti/getcount");
        setCount(count.count);
      }, 2000)
    };
    getCount();
    /////////////////////////////////////////////////////////////////////////////////////
  }, [history, setUsername, setMonney]);
  const handleLogout = async () => {
    await postRequest("/user/moremonney", {
      moremonney: monneynow,
    });
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

          {/* ///////////////////////////////////////////////////////////////////////////////////// */}
          <Menu.Item block type="primary" onClick={() => setVisible(true)}
            key="notification"
            icon={
              <Badge count={count}>
                <BellOutlined />
              </Badge>
            }
          >
            Thông báo
          </Menu.Item>


          <Modal
            visible={visible}
            title="Thông báo"
            footer={
              <Button/>
              //   type="primary"
              //   onClick={async () => {
              //       message.error("Mật khẩu xác nhận không khớp với mật khẩu mới");

              //   }}
              // >
              //   Thông báo
              // </Button>
            }
            onCancel={() => {
              setVisible(false);
              //form.resetFields();
            }}
          >

            <Menu.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              rules={[{ required: true, message: "Xác nhận mật khẩu mới" }]}
            />

          </Modal>
          {/* ///////////////////////////////////////////////////////////////////////////////////// */}


        </Menu>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <UserOutlined style={{ fontSize: "30px", marginBottom: "25px" }} />
        <p style={{ fontSize: "30px" }}>{username}</p>
        <LogoutStyle onClick={handleLogout} />
      </div>
    </NavBarStyle>
  );
}
