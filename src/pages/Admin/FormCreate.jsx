import React from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { postRequest } from "../../hooks/api";
export default function FormCreate(props) {
  const [form] = Form.useForm();
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label="Tên tài khoản"
        name="username"
        rules={[{ required: true, message: "Hãy nhập tài khoản" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu"
        name="confirmpassword"
        rules={[{ required: true, message: "Hãy xác nhận lại mật khẩu mật khẩu" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Số tiền"
        name="monney"
        rules={[{ required: true, message: "Hãy nhập số tiền" }]}
      >
        <InputNumber
          min={1000}
          max={1000000}
          step={1000}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          onClick={async () => {
            if (form.getFieldValue("confirmpassword") !== form.getFieldValue("password")) {
              message.error("Mật khẩu xác nhận không khớp với mật khẩu"); 
            } else {
              await postRequest("/user/createuser", form.getFieldsValue());
              props.onCancel();
            }
          }}
        >
          Tạo
        </Button>
      </Form.Item>
    </Form>
  );
}
