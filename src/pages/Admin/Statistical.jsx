import React, { useState, useEffect } from "react";
import { getRequest } from "../../hooks/api";

export default function Statistical() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getnotification = async () => {
      let data = await getRequest("/getStatiscical");
      setData(data);
    };
    getnotification();
  }, []);
  return (
    <div>
      <h1>Tiền nạp : {data.priceMonney}</h1>
      <h1>Tiền dịch vụ : {data.priceFood}</h1>
    </div>
  );
}
