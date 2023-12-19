import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import "./ConfigTab.css";

function ConfigTab({ selectedTerminal, activeTab }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab !== "Configtab" || selectedTerminal === null) {
        return;
      }
  
      setLoading(true);
  
      try {
        const response = await fetch(
          `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config?dest=${selectedTerminal}`
        );
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        const responseData = await response.json();
        setJsonData(responseData);
  
        // Set initial form values using setFieldsValue
        form.setFieldsValue(responseData?.[0]?.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
  
    if (!isInitialRender && selectedTerminal !== null) {
      fetchData();
    }
  
    setIsInitialRender(false);
  }, [selectedTerminal, isInitialRender, activeTab, form]);
 
  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formData = { data: values };

      const response = await fetch(
        "https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with an error: ${response.status}`);
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Form submission error:", error.message);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initialValues = jsonData?.[0]?.data || {};

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Configuration</div>

        <Form onFinish={onFinish} form={form} initialValues={initialValues}>
          {Object.entries(initialValues).map(([key, value]) => (
            <Form.Item
              key={key}
              label={key}
              name={key}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 19 }}
              className="labelconfig"
            >
              <Input
                className="inputconfig"
                type={typeof value === "number" ? "number" : "text"}
                defaultValue={value}
              />
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

ConfigTab.propTypes = {
  selectedTerminal: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default ConfigTab;
