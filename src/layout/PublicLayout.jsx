import React from "react";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import SideBar from "../components/SideBar";

const { Header, Content, Sider } = Layout;

const HeaderStyle = styled(Header)`
  background-color: white;
`;

const PublicLayout = (props) => {
  return (
    <Layout>
      <HeaderStyle>
        <NavBar />
      </HeaderStyle>
      <Layout>
        <Content style={{ margin: "0 auto" }}>{props.children}</Content>
        <Sider>
          <SideBar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default PublicLayout;
