import React, { useState, useEffect } from "react";
import DrinkItem from "../components/DrinkItem";
import styled from "styled-components";
import { getRequest } from "../hooks/api";
const DrinkStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: calc(100vh - 84px);
  overflow-y: auto;
  margin: 10px 0 10px 10px;
`;

export default function Drink() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const getFoods = async () => {
      let foods = await getRequest("/getfood");
      setFoods(foods);
    };
    getFoods();
  }, []);
  return (
    <DrinkStyle>
      {foods.map((e) => (
        <DrinkItem key={e.id} name={e.name} url={e.url} price={e.price} />
      ))}
    </DrinkStyle>
  );
}
