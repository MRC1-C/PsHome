import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
// import db from "../../../firebase/config";
import ChatItem from "../components/ChatItem";

////////////////////////////////////////////////////////
import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { getRequest } from "../hooks/api";

const host = "http://127.0.0.1:4000";
/////////////////////////////////////////////////////////

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
  const messageListRef = React.useRef(null);
  const inputRef = React.useRef(null);

  /////////////////////////////////////////////////////////
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  const socketRef = useRef();
  const messagesEnd = useRef();

  // useEffect(() => {
  //   socketRef.current = socketIOClient.connect(host)
  //   socketRef.current.on('connect', function () {
  //     console.log("connected to server")
  // });


  //   socketRef.current.on('getID', data => {
  //     setId(data)
  //   })

  //   socketRef.current.on('sendDataServer', dataGot => {
  //     setMess(oldMsgs => [...oldMsgs, dataGot.data])
  //     //scrollToBottom()
  //   })

  //   return () => {
  //     socketRef.current.disconnect();
  //   };

  // }, []);


//   const sendMessage = () => {
//     if(message !== null) {
//        const msg = {
//          content: message, 
//          id: id
//        }
//        socketRef.current.emit('sendDataClient', msg)
 
//      /*Khi emit('sendDataClient') bên phía server sẽ nhận được sự kiện có tên 'sendDataClient' và handle như câu lệnh trong file index.js
//            socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
//              socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
//            })
//      */
//        setMessage('')
//      }
//  }

  // const scrollToBottom = () => {
  //   messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  // }

  // const renderMess =  mess.map((m, index) => 
  //       <div key={index} className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}>
  //         {m.content}
  //       </div>
  // )

  // const renderMess1 =  mess.map((m, index) => 
  //   <ChatItem text={m.content}/>
  //   // <ChatItem you={dt.you==='quan'} text={m.content} name={dt.you}/>
  // )

      

  // const handleChange = (e) => {
  //   setMessage(e.target.value)
  // }
    
  // const onEnterPress = (e) => {
  //   if(e.keyCode == 13 && e.shiftKey == false) {
  //     sendMessage()
  //   }
  // }

  ////////////////////////////////////////////////////////

  const handleSent = () => {
    
  };
  React.useEffect(() => {
    // let data = getRequest(@/)
    // setMessage(data)
  }, []);
  
  
  return (
    <WrapperStyled>
      <ContentStyled >
        
        {
                    message.map(dt => {
                        return <ChatItem you={dt.you!=='admin'} text={dt.text} name={dt.you}/>
                    })
                }
        {/* <ChatItem text={renderMess} /> you name={name} /> */}
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