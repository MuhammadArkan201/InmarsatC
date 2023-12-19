import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

function Emailform({ selectedTerminal, activeTab }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailLesId, setEmailLesId] = useState(null);
  const [tdmOrigin, setTdmOrigin] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "Emailtab" && selectedTerminal !== null) {
          // Fetch email_les_id
          const emailConfigResponse = await axios.get(
            `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config?dest=${selectedTerminal}`
          );
          const emailConfigData = emailConfigResponse.data[0]?.data;
          setEmailLesId(emailConfigData?.email_les_id);

          // Fetch tdmOrigin
          const statusResponse = await axios.get(
            `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/status?dest=${selectedTerminal}`
          );
          const statusData = statusResponse.data[0]?.data;
          setTdmOrigin(statusData?.tdmOrigin);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (!isInitialRender) {
      fetchData();
    }

    setIsInitialRender(false);
  }, [selectedTerminal, isInitialRender, activeTab]); // Update dependencies

  const onFinish = async (values) => {
    try {
      // Send a POST request using Axios
      if (values.appendInfo) {
        const currentTimestamp = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        values.subject += `| OR: ${tdmOrigin} | LES: ${emailLesId} | ${currentTimestamp}`;
      }

      const response = await axios.post(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/email?dest=${selectedTerminal}`,
        {
          dest: values.dest,
          subject: values.subject,
          body: values.body,
        }
      );

      console.log("Email sent successfully!", response.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
      setErrorMessage("Error sending email. Please try again.");
    } finally {
      setLoading(false);
      // Reset specific form fields
      form.resetFields(["dest", "subject", "body"]);
      console.log("Form reset successfully!");
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
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
        <div className="checkbox">
          <Form.Item
            name="appendInfo"
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox className="checkbox-text">
              {`Append network info and timestamp into email subject | OR: ${tdmOrigin} | LES: ${emailLesId}`}
            </Checkbox>
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

Emailform.propTypes = {
  selectedTerminal: PropTypes.number,
  activeTab: PropTypes.string.isRequired,
};

export default Emailform;
