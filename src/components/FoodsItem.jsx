import { Button, Image, Modal, Form, Input, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { getRequest, postRequest } from "../hooks/api";
import { useStore } from "../hooks/useStore";
const DrinkItemStyle = styled.div`
  width: 400px;
`;
export default function DrinkItem(props) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const setFoods = useStore((state) => state.setFoods);
  return (
    <DrinkItemStyle>
      <Image src={props.url} width={400} height={330} />
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: 0,
          }}
        >
          {props.name} :{" "}
          {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          gap: "10px",
          justifyContent: "space-between",
        }}
      ></div>
      <div style={{ display: "flex" }}>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => setVisible(true)}
          block
        >
          Sửa
        </Button>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          block
          danger
          onClick={async () => {
            await postRequest("/deletefood", { name: props.name });
            let foods = await getRequest("/getfood");
            setFoods(foods);
          }}
        >
          Xóa
        </Button>
      </div>
      <Modal
        title="Tạo đồ ăn mới"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Button
            type="primary"
            onClick={async () => {
              await postRequest("/editfood", {
                ...form.getFieldsValue(),
                nameold: props.name,
              });
              let foods = await getRequest("/getfood");
              setFoods(foods);
              setVisible(false);
            }}
          >
            Sửa đồ ăn
          </Button>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên đồ ăn"
            name="name"
            initialValue={props.name}
            rules={[{ required: true, message: "Hãy nhập tên đồ ăn" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đường dẫn ảnh"
            name="url"
            initialValue={props.url}
            rules={[{ required: true, message: "Hãy nhập đường dẫn ảnh" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số tiền"
            name="price"
            initialValue={props.price}
            rules={[{ required: true, message: "Hãy nhập số tiền" }]}
          >
            <InputNumber
              min={1000}
              max={1000000}
              step={1000}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </DrinkItemStyle>
  );
}
