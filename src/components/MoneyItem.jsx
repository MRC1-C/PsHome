import { Button, message } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";

const DrinkItemStyle = styled.div`
  width: 400px;
  text-align: center;
`;
const TextStyle = styled.h1`
  font-size: 50px;
  padding: 50px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #e5f2ff;
  margin: 0;
`;

export default function MoneyItem(props) {
  const { timeplay, setTimePlay, monney, setMonney } = useStore((state) => ({
    timeplay: state.timeplay,
    setTimePlay: state.setTimePlay,
    monney: state.monney,
    setMonney: state.setMonney,
  }));
  const handleButton = () => {
    setTimePlay(timeplay + (props.quantity * 60 * 60 * 1000) / 5000);
    //setMonney(monney + props.quantity);
    message.success("Bạn đã nạp thành công");
  };
  return (
    <DrinkItemStyle>
      <TextStyle>{props?.quantity + " VNĐ"}</TextStyle>
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
