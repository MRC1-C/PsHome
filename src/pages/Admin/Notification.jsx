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
    await postRequest("/stat/createstatistical", {
      priceMonney: classify ? monney : 0,
      priceFood: classify ? 0 : monney,
    });
  };
  const handleButtonReturn = async (id, check) => {
    await postRequest("/noti/returnnotification", { id: id, check: check, });
    let data = await getRequest("/noti/getnotification");
    setData(data);
    let count = await getRequest("/noti/getcount");
    setCount(count.count);
  };
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      width: "10%",
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
      width: "10%"
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
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

              handleButtonReturn(record.id, 1);
            }}
          >
            Xác nhận
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleButtonReturn(record.id, 2)}
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
