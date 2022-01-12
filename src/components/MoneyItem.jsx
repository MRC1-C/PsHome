import { Button, message } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";
import { postRequest } from "../hooks/api";
const DrinkItemStyle = styled.div`
  width: 400px;
  text-align: center;
`;
const TextStyle = styled.h1`
  font-size: 45px;
  padding: 50px;
  border: 1px solid black;
  height: 200px;
  border-radius: 5px;
  background-color: #e5f2ff;
  margin: 0;
`;

export default function MoneyItem(props) {
  const { userName, monney, setMonney } = useStore((state) => ({
    userName: state.userName,
    monney: state.monney,
    setMonney: state.setMonney,
  }));
  const handleButton = async () => {
    await postRequest("/noti/createnotification", {
      username: userName,
      name: `Nạp ${props.quantity} VNĐ`,
      notification: "Nạp tiền",
      quantity: 1,
      price: props.quantity,
    });
    message.success("Bạn đã nạp tiền thành công");
    setMonney(monney + props.quantity);
  };
  return (
    <DrinkItemStyle>
      <TextStyle>
        {props?.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " VNĐ"}
      </TextStyle>
      <div
        style={{
          padding: "10px",
        }}
      ></div>
      <Button
        type="primary"
        icon={<DollarCircleOutlined />}
        block
        onClick={handleButton}
      >
        Nạp tiền
      </Button>
    </DrinkItemStyle>
  );
}
