import React from "react";
import DrinkItem from "../components/DrinkItem";
import styled from "styled-components";

const DrinkStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: calc(100vh - 74px);
  overflow-y: auto;
  margin: 10px 0 0 10px;
`;

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Drink() {
  return (
    <DrinkStyle>
      {arr.map((id) => (
        <DrinkItem key={id} />
      ))}
    </DrinkStyle>
  );
}
