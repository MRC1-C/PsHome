import React from "react";
import { Form, Button, Input, message } from "antd";
import { postRequest } from "../hooks/api";
import styled from "styled-components";
import logo from "../components/image/logo.png";
import { useHistory } from "react-router";
import { useStore } from "../hooks/useStore";

const LoginStyle = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0 20px 20px 20px;
  align-items: center;
`;

export default function Login() {
  const history = useHistory();
  const [form] = Form.useForm();
  const setMonney = useStore((state) => state.setMonney);
  const handleLogin = async () => {
    const { username, password } = form.getFieldValue();
    try {
      let data = await postRequest("/user/login", {
        username: username,
        password: password,
      });
      if (data) {
        localStorage.setItem("accessToken", data?.access);
        if (data?.status === "lock") {
          message.error("Tài khoản của bạn đang bị khóa");
        } else if (data?.monney > 0) {
          if (username === "admin") history.push("/admin/user");
          else {
            setMonney(data.monney);
            history.push("/");
          }
        } else {
          message.error("Bạn không đủ tiền");
        }
      }
    } catch (err) {
      message.error("Tài khoản hoặc mật khẩu không chính xác");
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "200px" }}></div>
      <LoginStyle>
        <img src={logo} alt="logo" style={{ width: "200px" }} />
        <Form form={form} layout="vertical" style={{ width: "90%" }}>
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </LoginStyle>
    </div>
  );
}
