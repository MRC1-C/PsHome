import React from "react";
import DrinkItem from "../components/DrinkItem";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";
const DrinkStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: calc(100vh - 84px);
  overflow-y: auto;
  margin: 10px 0 10px 10px;
`;

export default function Drink() {
  const foods = useStore((state) => state.foods);
  return (
    <DrinkStyle>
      {foods.map((e) => (
        <DrinkItem key={e.id} name={e.name} url={e.url} price={e.price} />
      ))}
    </DrinkStyle>
  );
}
