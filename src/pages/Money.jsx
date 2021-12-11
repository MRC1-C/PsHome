import React from "react";
import MoneyItem from "../components/MoneyItem";
import styled from "styled-components";

const DrinkStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: calc(100vh - 74px);
  overflow-y: auto;
  margin: 10px 0 0 25px;
`;

const arr = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 10, 20, 30, 50];
export default function Money() {
  return (
    <DrinkStyle>
      {arr.map((id) => (
        <MoneyItem key={id} quantity={id * 10000} />
      ))}
    </DrinkStyle>
  );
}
