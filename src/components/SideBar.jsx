import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Form, Input, Statistic } from "antd";
import { postRequest } from "../hooks/api";
import { useStore } from "../hooks/useStore";
import { useHistory } from "react-router";
const SideBarStyle = styled.div`
  background-color: white;
  height: 100%;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .label {
    font-size: 25px;
  }
  .time {
    font-size: 20px;
    border: 1px solid black;
  }
`;

export default function SideBar() {
  const mn = 5000;
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [monneytime, setMonneyTime] = useState(0);
  const [form] = Form.useForm();
  const { monney, setMonneyNow, serviceFee, setServiceFee } = useStore(
    (state) => ({
      monney: state.monney,
      setMonneyNow: state.setMonneyNow,
      serviceFee: state.serviceFee,
      setServiceFee: state.setServiceFee,
    })
  );
  const convertTime = (value) => {
    let time = (value * 60 * 60) / mn;
    let h = parseInt(time / (60 * 60));
    let p = parseInt((time - h * 60 * 60) / 60);
    let s = parseInt(time - p * 60 - h * 60 * 60);
    h = h > 9 ? h : "0" + h;
    p = p > 9 ? p : "0" + p;
    s = s > 9 ? s : "0" + s;
    return h + ":" + p + ":" + s;
  };
  useEffect(() => {
    setServiceFee(0);
  }, [setServiceFee]);
  useEffect(() => {
    let loop = setInterval(() => {
      setMonneyTime(monneytime + mn / (60 * 60));
      setMonneyNow(monney - monneytime);
      if (monneytime >= monney) {
        postRequest("/moremonney", {
          moremonney: 0,
        });
        localStorage.clear();
        history.push("/login");
      }
    }, 1000);
    return () => {
      clearInterval(loop);
    };
  }, [monneytime, history, monney, setMonneyNow]);
  return (
    <SideBarStyle>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>Tổng thời gian</p>
          }
          value={convertTime(monney)}
        />
      </div>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>
              Thời gian sử dụng
            </p>
          }
          value={convertTime(monneytime)}
        />
      </div>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>
              Thời gian còn lại
            </p>
          }
          value={convertTime(monney - monneytime + 1)}
        />
      </div>
      <div>
        <Statistic
          title={
            <p style={{ fontSize: "20px", marginBottom: 0 }}>
              Chi phí giờ chơi
            </p>
          }
          value={mn}
        />
      </div>
      <div>
        <Statistic
          value={serviceFee}
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
        footer={
          <Button
            type="primary"
            onClick={async () => {
              await postRequest("/changepassword", {
                newpassword: form.getFieldValue("newpassword"),
              });
              setVisible(false);
              form.resetFields();
            }}
          >
            Đổi mật khẩu
          </Button>
        }
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form}>
          <Form.Item
            label="Nhập mật khẩu mới"
            name="newpassword"
            rules={[{ required: true, message: "Nhập mẩu khẩu mới" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </SideBarStyle>
  );
}
