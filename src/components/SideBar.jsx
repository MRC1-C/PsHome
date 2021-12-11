import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal, Form, Input, Statistic } from "antd";
import { postRequest } from "../hooks/api";
import moment from "moment";
import { useStore } from "../hooks/useStore";
import { useHistory } from "react-router";
const { Countdown } = Statistic;
const SideBarStyle = styled.div`
  background-color: white;
  height: 100%;
  padding: 10px;
  text-align: center;
  .label {
    font-size: 25px;
  }
  .time {
    font-size: 20px;
    border: 1px solid black;
  }
`;

export default function SideBar() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { monney, timeplay, setTimePlay } = useStore((state) => ({
    monney: state.monney,
    timeplay: state.timeplay,
    setTimePlay: state.setTimePlay,
  }));
  const onFinish = async () => {
    // await postRequest("/moremonney", {
    //   moremonney: 1,
    // });
    console.log("object");
    localStorage.clear();
    history.push("/login");
  };
  return (
    <SideBarStyle>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>Tổng thời gian</p>
          }
          value={(monney * 60 * 60 * 1000) / 5000}
          formatter={(value) => (
            <p>{moment(value - 8 * 60 * 60 * 1000).format("HH:mm:ss")}</p>
          )}
        />
      </div>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>
              Thời gian sử dụng
            </p>
          }
          value={(monney * 60 * 60 * 1000) / 5000 - timeplay + 1000}
          formatter={(value) => (
            <p>{moment(value - 8 * 60 * 60 * 1000).format("HH:mm:ss")}</p>
          )}
        />
      </div>
      <div>
        <Countdown
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>
              Thời gian còn lại
            </p>
          }
          value={Date.now() + timeplay}
          onChange={(e) => setTimePlay(e)}
          onFinish={onFinish}
        />
      </div>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>
              Chi phí giờ chơi
            </p>
          }
          value={5000}
        />
      </div>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>Chi phí dịch vụ</p>
          }
        />
      </div>
      <Button block type="primary" onClick={() => setVisible(true)}>
        Đổi mật khẩu
      </Button>
      <Modal
        visible={visible}
        title="Đổi mật khẩu"
        onOk={async () => {
          console.log(form.getFieldValue("newpassword"));
          await postRequest("/changepassword", {
            newpassword: form.getFieldValue("newpassword"),
          });
          setVisible(false);
          form.resetFields();
        }}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form}>
          <Form.Item
            label="Nhập mật khẩu mới"
            name="newpassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </SideBarStyle>
  );
}
