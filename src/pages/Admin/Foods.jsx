import React, { useEffect, useState } from "react";
import FoodsItem from "../../components/FoodsItem";
import styled from "styled-components";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { getRequest, postRequest } from "../../hooks/api";
import { useStore } from "../../hooks/useStore";
const DrinkStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  height: calc(100vh - 166px);
  overflow-y: auto;
  margin: 10px 0 10px 20px;
`;

export default function Foods() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { foods, setFoods } = useStore((state) => ({
    foods: state.foods,
    setFoods: state.setFoods,
  }));
  useEffect(() => {
    const getFoods = async () => {
      let foods = await getRequest("/getfood");
      setFoods(foods);
    };
    getFoods();
  }, [setFoods]);
  return (
    <div>
      <Button
        type="primary"
        style={{ margin: "40px 0 10px 20px" }}
        onClick={() => setVisible(true)}
      >
        Tạo đồ ăn mới
      </Button>
      <DrinkStyle>
        {foods.map((e) => (
          <FoodsItem key={e.id} name={e.name} url={e.url} price={e.price} />
        ))}
      </DrinkStyle>
      <Modal
        title="Tạo đồ ăn mới"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Button
            type="primary"
            onClick={async () => {
              await postRequest("/createfood", form.getFieldsValue());
              let foods = await getRequest("/getfood");
              setFoods(foods);
              setVisible(false);
            }}
          >
            Tạo
          </Button>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên đồ ăn"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên đồ ăn" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đường dẫn ảnh"
            name="url"
            rules={[{ required: true, message: "Hãy nhập đường dẫn ảnh" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số tiền"
            name="price"
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
    </div>
  );
}
