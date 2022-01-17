import React, { useState, useEffect } from "react";
import { getRequest } from "../../hooks/api";
import Chart from "react-apexcharts";
import { Col, Row } from "antd";

export default function Statistical() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getnotification = async () => {
      let data = await getRequest("/stat/getStatiscical");
      setData(data);
      console.log(data)
    };
    getnotification();
  }, []);
  const dataChart = {
    options: {
      chart: {
        id: "basic-line"
      },
      title: {
        text: "Thống kê theo thời gian",
        align: 'left',
        style: {
          fontSize:  '25px',
          fontWeight:  'bold',
          fontFamily:  'Helvetica, Arial, sans-serif',
          color:  '#263238'
        },
      },
    },
    series: [
      {
        name: "Food",
        data: data?.stat?.map(e=>e.priceFood)
      },
      {
        name: "Monney",
        data: data?.stat?.map(e=>e.priceMoney)
      }
    ]
  };
  const dataChartPie = {
    options: {
      chart: {
        id: "basic-pie",
      },
      title: {
        text: 'Thống kê theo dịch vụ',
        align: 'left',
        style: {
          fontSize:  '25px',
          fontWeight:  'bold',
          fontFamily:  'Helvetica, Arial, sans-serif',
          color:  '#263238'
        },
      },
      labels: ['Tiền dịch vụ', "Tiền nạp"]
    },
    series: [data?.priceFood?data?.priceFood:1, data?.priceMonney?data?.priceMonney:1],
  };
  return (
    <div style={{padding: "20px"}}>
      <Row>
        <Col span={16} >
       <Chart
              options={dataChart?.options}
              series={dataChart?.series}
              type="line"
              width="70%"
            />
        </Col>
        <Col span={8}>
      <Chart
        options={dataChartPie?.options}
        series= {dataChartPie?.series}
        type="pie"
        width="100%"
      />
        </Col>
      </Row>
    </div>
  );
}
