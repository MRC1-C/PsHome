import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./image/logo.png";
import {
  WechatOutlined,
  CoffeeOutlined,
  BellOutlined,
  DollarCircleOutlined,
  DeleteOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button, Modal, Badge, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { getRequest, postRequest } from "../hooks/api";
import { useHistory } from "react-router";
import { useStore } from "../hooks/useStore";
// import { render } from "@testing-library/react";
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
  const [visible2, setVisible2] = useState(false);
  const [current, setCurrent] = useState("drink");
  const [notification, setNotification] = useState([])
  // const [data, setData] = useState();
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
        let count = await getRequest("/noti/getcountuser");
        setCount(count.count);
      }, 2000)
      // let count = await getRequest("/noti/getcountuser");
      //   setCount(count.count);
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

  const deleteNoti = async () => {
    await getRequest("/noti/deletenotification");
    let data = await getRequest("/noti/getnotiuser");
    setNotification(data);
  };

  const showNotification = async () => {
    setVisible(true);
    
    let data = await getRequest("/noti/getnotiuser");
    setNotification(data);
    await getRequest("/noti/seennotification");
  };
  const checkNotification = (approve, name, seen) => {
    if (approve === 1 && seen) {
      return <div style={{ 
        backgroundColor: "#AFD788", 
        color: "#555555",
        padding: "12px" }}
      >
        Yêu cầu {name} được chấp nhận
      </div>
    } else if (approve === 2 && seen) {
      return <div style={{ 
        backgroundColor: "#F5A89A", 
        color: "#555555",
        padding: "12px" }}
      >
        Yêu cầu {name} bị từ chối
      </div>
    } else if (approve === 1) {
      return <div style={{ 
        backgroundColor: "#009900", 
        color: "white",
        padding: "12px" }}
      >
        Yêu cầu {name} được chấp nhận
      </div>
    } else {
      return <div style={{ 
        backgroundColor: "red", 
        color: "white",
        padding: "12px" }}
      >
        Yêu cầu {name} bị từ chối
      </div>
    }
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
          {/* <Menu.Item block type="primary" onClick={() => setVisible(true)} */}
          <Menu.Item block type="primary" onClick={() => showNotification()}
            key="notification"
            icon={
              <Badge count={count}>
                <BellOutlined />
              </Badge>
            }
          >
            Thông báo
          </Menu.Item>

  
          {/* ///////////////////////////////////////////////////////////////////////////////////// */}


        </Menu>
        
        <Modal
          visible={visible}
          title="Thông báo"

          footer={
            <Popconfirm
              title="Bạn có muốn xóa tất cả thông báo đã xem không?"
              onConfirm={() => deleteNoti() }
              okText="Có"
              cancelText="Không"
            >
              <Button danger type="primary">
                <DeleteOutlined /> Xóa
              </Button>
            </Popconfirm>

          }
          onCancel={() => {
            setVisible(false);
            //form.resetFields();
          }}
        >

          <div style={{height: "300px", overflowY: "auto"}}>
            {notification.map(e => <p style={{height: "50px"}}
              key={e.notification}
            >
              {checkNotification(e.approve, e.name, e.seen)}
              
            </p>)}

          </div>
        </Modal>
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
