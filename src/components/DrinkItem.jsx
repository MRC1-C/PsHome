import { Button, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const DrinkItemStyle = styled.div`
  width: 400px;
`;
export default function DrinkItem(props) {
  const [quantity, setQuantity] = useState(1);
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
          {props.name} : {props.price} VNĐ
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
      >
        <MinusOutlined
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginBottom: 0 }}>Số lượng {quantity}</p>
        </div>
        <PlusOutlined
          onClick={() => quantity < 10 && setQuantity(quantity + 1)}
        />
      </div>
      <Button type="primary" icon={<ShoppingCartOutlined />} block>
        Đặt
      </Button>
    </DrinkItemStyle>
  );
}
