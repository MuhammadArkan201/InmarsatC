import React from 'react'
import { Form, Input, Radio, Button } from "antd";
import "../../../../../App.css";

function Emailform() {
  const onFinish = (values) => {
 
    console.log("Form values:", values);
  };
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Email Destination"
        name="emailDest"
        rules={[{ required: true, message: "Please enter Email Destination!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Subject"
        name="subject"
        rules={[{ required: true, message: "Please enter Subject!" }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: "Please enter Body!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <p>
          For testing it is recommended to set the character as minimum as
          possible for email body and keep subject empty to reduce the data
          usage.
        </p>
        <div className="radiobtn">
              <Radio className="radio-text" value={1}>
              Append network info and timestamp into email subject
              </Radio>
            </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Emailform;
