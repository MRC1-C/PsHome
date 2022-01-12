import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../hooks/api";
import styled from "styled-components";
import { useStore } from "../../hooks/useStore";
const NotificationStyled = styled.div`
  margin: 60px 10px 10px 10px;
  height: calc(100vh - 155px);
`;
export default function Notification() {
  const [data, setData] = useState([]);
  const setCount = useStore((state) => state.setCount);
  useEffect(() => {
    const getnotification = async () => {
      let data = await getRequest("/noti/getnotification");
      setData(data);
    };
    getnotification();
  }, []);
  const handleButton = async (classify, monney) => {
    await postRequest("/createstatistical", {
      priceMonney: classify ? monney : 0,
      priceFood: classify ? 0 : monney,
    });
  };
  const handleButtonDelete = async (id) => {
    await postRequest("/noti/deletenotification", { id: id });
    let data = await getRequest("/noti/getnotification");
    setData(data);
    let count = await getRequest("/noti/getcount");
    setCount(count.count);
  };
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "username",
    },
    {
      title: "Thông báo",
      dataIndex: "notification",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (value) =>
        value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ",
    },
    {
      title: "Tổng tiền",
      dataIndex: "allprice",
      render: (text, record) =>
        (record.price * record.quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ",
    },
    {
      dataIndex: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              handleButton(
                record.notification === "Nạp tiền" ? true : false,
                record.price * record.quantity
              );

              handleButtonDelete(record.id);
            }}
          >
            Xác nhận
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleButtonDelete(record.id)}
          >
            Từ chối
          </Button>
        </div>
      ),
    },
  ];
  return (
    <NotificationStyled>
      <h1>Thông báo </h1>
      <Table
        rowKey={(record) => record.id}
        tableLayout="fixed"
        columns={columns}
        dataSource={data}
      />
    </NotificationStyled>
  );
}
