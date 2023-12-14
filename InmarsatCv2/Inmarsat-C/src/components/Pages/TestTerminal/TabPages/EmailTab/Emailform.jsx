import React, { useState } from "react";
import { Form, Input, Radio, Button } from "antd";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

function Emailform({ preferredOcean, selectedTerminal }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = async (values) => {
    try {
      // If the radio button is checked, modify the subject
      if (values.appendInfo) {
        const currentTimestamp = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        values.subject += ` | ${preferredOcean} at ${currentTimestamp}`;
      }

      setLoading(true);

      // Send a POST request using Axios
      const response = await axios.post(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/email?dest=${selectedTerminal}`,
        {
          dest: values.dest,
          subject: values.subject,
          body: values.body,
          appendInfo: values.appendInfo,
        }
      );

      console.log("Email sent successfully!", response.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
      setErrorMessage("Error sending email. Please try again.");
    } finally {
      setLoading(false);
      // Reset specific form fields
      form.resetFields(["dest", "subject", "body", "appendInfo"]);
      console.log("Form reset successfully!");
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Email Destination"
        name="dest"
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
          For testing, it is recommended to set the character count as minimum
          as possible for the email body and keep the subject empty to reduce
          data usage.
        </p>
        <div className="radiobtn">
          <Form.Item
            name="appendInfo"
            valuePropName="checked"
            initialValue={false}
          >
            <Radio className="radio-text" value={true}>
              Append network info and timestamp into email subject
            </Radio>
          </Form.Item>
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

Emailform.propTypes = {
  preferredOcean: PropTypes.string,
  selectedTerminal: PropTypes.number,
};

export default Emailform;
