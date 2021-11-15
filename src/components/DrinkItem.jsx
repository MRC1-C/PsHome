import { Button, Image, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const DrinkItemStyle = styled.div`
  width: 400px;
`;
export default function DrinkItem() {
  return (
    <DrinkItemStyle>
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <p style={{ marginBottom: 0 }}>Số lượng</p>
        <InputNumber min={1} max={10} defaultValue={1} />
      </div>
      <Button type="primary" icon={<ShoppingCartOutlined />} block>
        Đặt
      </Button>
    </DrinkItemStyle>
  );
}
