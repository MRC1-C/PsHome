import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import NavBarAdmin from "../components/NavBarAdmin";
const { Header, Content } = Layout;

const HeaderStyle = styled(Header)`
  background-color: white;
`;

const PublicLayoutAdmin = (props) => {
  return (
    <Layout>
      <HeaderStyle>
        <NavBarAdmin />
      </HeaderStyle>
      <Layout>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default PublicLayoutAdmin;
