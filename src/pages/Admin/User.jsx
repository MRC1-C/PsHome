import React from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Popconfirm,
  Popover,
  InputNumber,
  Badge,
  message,
} from "antd";
import {
  PlusOutlined,
  DollarCircleOutlined,
  LockOutlined,
  DeleteOutlined,
  SearchOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Highlighter from "react-highlight-words";
import { getRequest, postRequest } from "../../hooks/api";
import FormCreate from "./FormCreate";
const UserStyled = styled.div`
  height: calc(100vh - 110px);
  margin: 40px 20px 0 20px;
`;
const PasswordStyled = styled(Input.Password)`
  border: none;
`;

class User extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    visible: false,
    data: [],
    monney: 1000,
    is_locked: false,
  };

  deleteUser = async (name) => {
    await postRequest("/user/deleteuser", {
      username: name,
    });
    let data = await getRequest("/user/getalluser");
    this.setState({ data: data });
  };
  lockUser = async (name) => {
    await postRequest("/user/lockuser", {
      username: name,
    });
    let data = await getRequest("/user/getalluser");
    this.setState({ data: data });
  }
  componentDidMount = async () => {
    let data = await getRequest("/user/getalluser");
    this.setState({ data: data });
  };
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={"Tìm kiếm theo tên tài khoản"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Lọc
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  handleMoreMonney = async (record) => {
    await postRequest("/user/moremonneyuser", {
      username: record.username,
      moremonney: record.monney + this.state.monney,
    });
    this.setState({ monney: 1000 });
    let data = await getRequest("/user/getalluser");
    this.setState({ data: data });
  };
  checkstatus = (status, name) => {
    if (status) {
      return <Popconfirm
        title="Bạn có muốn mở khóa tài khoản này không?"
        onConfirm={() => this.lockUser(name)}
        okText="Có"
        cancelText="Không"
      >
        <Button style={{ backgroundColor: "green", color: "white", width: "100%" }}>
          <LockOutlined />
          Mở khóa
        </Button>
      </Popconfirm>
    } else {
      return <Popconfirm
        title="Bạn có muốn khóa tài khoản này không không?"
        onConfirm={() => this.lockUser(name)}
        okText="Có"
        cancelText="Không"
      >
        <Button style={{ backgroundColor: "yellow", color: "gray", width: "100%" }}>
          <LockOutlined />
          Khóa
        </Button>
      </Popconfirm>
  }}
  render() {
    const onCancel = async () => {
      let data = await getRequest("/user/getalluser");
      this.setState({ data: data });
      this.setState({ visible: false });
    };
    const columns = [
      {
        title: "Tên tài khoản",
        dataIndex: "username",
        width: "25%",
        ...this.getColumnSearchProps("username"),
      },
      // {
      //   title: "Chat",
      //   dataIndex: "password",
        
      //   render: (value) => <PasswordStyled value={value} />,
      // },
      {
        title: "Số tiền còn lại",
        dataIndex: "monney",
        width: "20%",
        render: (value) => 
          value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ",
        sorter: (a, b) => a.monney - b.monney,
      },
      {
        title: "",
        dataIndex: "is_locked",
        width: "12%",

        render: (value, record) => this.checkstatus(record.is_locked, record?.username)

        // if (value) {
        //   render: (record) =>
        //   <Popconfirm
        //       title="Bạn có muốn khóa không?"
        //       onConfirm={() => this.lockUser(record?.username)}
        //       okText="Có"
        //       cancelText="Không"
        //     >
        //       <Button style={{ backgroundColor: "yellow", color: "gray" }}>
        //         <LockOutlined />
        //         Khóa
        //       </Button>
        //     </Popconfirm>
        // }, else :{
        //   render: (record) =>
        //   <Popconfirm
        //       title="Bạn có muốn mở khóa không?"
        //       onConfirm={() => this.lockUser(record?.username)}
        //       okText="Có"
        //       cancelText="Không"
        //     >
        //       <Button style={{ backgroundColor: "green", color: "gray" }}>
        //         <LockOutlined />
        //         Mở khóa
        //       </Button>
        //     </Popconfirm>
        // }
        
        
        //   // <WechatOutlined style={{height: "20px", width: "20px"}}>
        //   //   <Badge count={1} style={{height: "50%", width: "50%"}}></Badge>
        //   // </WechatOutlined>
        // ,
      },
      {
        dataIndex: "action",
        render: (text, record) => (
          <div style={{ display: "flex", gap: "5px" }}>

            <Button type="primary" style={{ backgroundColor: "gray", color: "white", width: "25%", }}>
              {/* <Badge count={1} /> */}
              <WechatOutlined />
              Chat
            </Button>

            <Popover
              content={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <InputNumber
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={this.state.monney}
                    onChange={(e) => this.setState({ monney: e })}
                    style={{ width: "100%" }}
                  />
                  <Button
                    onClick={() => this.handleMoreMonney(record)}
                    block
                    type="primary"
                  >
                    Nạp
                  </Button>
                </div>
              }
              title="Nạp tiền"
              trigger="click"
            >
              <Button type="primary">
                <DollarCircleOutlined />
                Nạp tiền
              </Button>
            </Popover>
            
            {/* ////////////////////////////////////////////////////////////////////////////////////// */}
            
            {/* <Popconfirm
              title="Bạn có muốn khóa không ?"
              onConfirm={() => this.lockUser(record?.username)}
              okText="Có"
              cancelText="Không"
            >
              <Button style={{ backgroundColor: "yellow", color: "gray" }}>
                <LockOutlined />
                Khóa
              </Button>
            </Popconfirm> */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}

            <Popconfirm
              title="Bạn có muốn xóa tài khoản này không?"
              onConfirm={() => this.deleteUser(record?.username)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger type="primary">
                <DeleteOutlined /> Xóa
              </Button>
            </Popconfirm>
            ,
          </div>
        ),
      },
    ];
    return (
      <UserStyled>
        <Button
          style={{ marginBottom: "30px" }}
          type="primary"
          onClick={() => this.setState({ visible: true })}
        >
          <PlusOutlined />
          Tạo tài khoản
        </Button>
        <Table
          rowKey={(record) => record.id}
          tableLayout="fixed"
          columns={columns}
          dataSource={this.state.data}
        />
        <Modal
          title="Tạo tài khoản mới"
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={false}
        >
          <FormCreate onCancel={onCancel} />
        </Modal>
      </UserStyled>
    );
  }
}
export default User;
