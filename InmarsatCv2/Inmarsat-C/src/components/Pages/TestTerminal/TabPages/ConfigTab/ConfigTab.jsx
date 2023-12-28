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
        // Fetch data from the first endpoint
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

      // Send a POST request to the second endpoint with all the form values
      const queryParams = new URLSearchParams({
        dest: selectedTerminal,
      });

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config2?${queryParams}`,
        true
      );

      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.status === 200 || xhr.status === 201) {
          console.log("Data submitted successfully");
        } else {
          console.error("Error submitting data:", xhr.statusText);
          setErrorMessage("An error occurred while submitting data.");
        }
      };

      xhr.send(JSON.stringify({ data: values }));
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