import React from "react";
import styled from "styled-components";

const SideBarStyle = styled.div`
  background-color: white;
  height: 100%;
  padding: 10px;
  text-align: center;
  .label {
    font-size: 25px;
  }
  .time {
    font-size: 20px;
    border: 1px solid black;
  }
`;

export default function SideBar() {
  return (
    <SideBarStyle>
      <div>
        <p className="label">Tổng thời gian</p>
        <p className="time">10:00:00</p>
      </div>
      <div>
        <p className="label">Thời gian sử dụng</p>
        <p className="time">10:00:00</p>
      </div>
      <div>
        <p className="label">Thời gian còn lại</p>
        <p className="time">10:00:00</p>
      </div>
      <div>
        <p className="label">Chi phí giờ chơi</p>
        <p className="time">10:00:00</p>
      </div>
      <div>
        <p className="label">Chi phí dịch vụ</p>
        <p className="time">10:00:00</p>
      </div>
    </SideBarStyle>
  );
}
