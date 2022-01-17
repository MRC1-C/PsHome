import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ChatItem from "../components/ChatItem"
import { getRequest, postRequest } from "../hooks/api";

const WrapperStyled = styled.div`
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
`;

const ContentStyled = styled.div`
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export default function Chat() {
  const [form] = Form.useForm();
  const inputRef = React.useRef(null);
  const [message, setMessage] = useState([]);

  useEffect(()=>{
    let m = setInterval(async () => {
      // let data = await getRequest("/chat/viewchat");
      let data = await getRequest("/chat/viewchat");
      setMessage(data);
    }, 1000)
    return ()=>{
      clearInterval(m)
    }
  },[])

  const handleSent = () => {
       postRequest("/chat/sendmessage",{
         chat: form.getFieldValue("text"),
         checkUser: true,
       })
       form.resetFields()
  };
  
  return (
    <WrapperStyled>
      <ContentStyled >
        
        {
          message.map(dt => {
            return <ChatItem you={dt.checkUser} text={dt.chat} name={dt.checkUser?dt.username:"A"} />
          })
        } 
      </ContentStyled>
      <FormStyled form={form}>
        <Form.Item name="text" style={{ width: "100%" }}>
          <Input ref={inputRef} />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSent} type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </FormStyled>
    </WrapperStyled>
  );
}
// let time = data.map(e=> e.time)
// let data = data.map(e=>e.data)