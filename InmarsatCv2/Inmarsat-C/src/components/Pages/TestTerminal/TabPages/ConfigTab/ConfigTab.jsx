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
    const fetchData = () => {
      if (activeTab !== "Configtab" || selectedTerminal === null) {
        return Promise.resolve(null);
      }
  
      setLoading(true);
  
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config?dest=${selectedTerminal}`,
        true
      );
  
      return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } else {
              reject(new Error(`Network response was not ok: ${xhr.status}`));
            }
          }
        };
  
        xhr.onerror = function () {
          reject(new Error("XHR request failed"));
        };
  
        xhr.send();
      });
    };
  
    // Check if it's the initial render
    if (!isInitialRender && selectedTerminal !== null) {
      fetchData()
        .then((responseData) => {
          setJsonData(responseData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setErrorMessage("An error occurred while fetching data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  
    // Set isInitialRender to false after the first render
    setIsInitialRender(false);
  }, [selectedTerminal, isInitialRender, activeTab]);
  

  const onFinish = async (values) => {
    try {
      setLoading(true);
  
      // Convert form data to JSON format
      const formData = JSON.stringify({ data: values });
  
      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();
  
      // Configure it to be a POST request to the desired URL
      xhr.open("POST", "https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config2", true);
  
      // Set the content type to JSON
      xhr.setRequestHeader("Content-Type", "application/json");
  
      // Set the callback function for when the request completes
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log("Form submitted successfully");
        } else {
          console.error("Form submission error:", xhr.statusText);
          setErrorMessage(`Server responded with an error: ${xhr.status}`);
        }
      };
  
      // Set the callback function for network errors
      xhr.onerror = function () {
        console.error("Form submission error: Network error");
        setErrorMessage("An error occurred. Please try again.");
      };
  
      // Send the request with the form data
      xhr.send(formData);
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
              labelCol={{ span: 4 }} // Adjust the span as needed
              wrapperCol={{ span: 19 }} // Adjust the span as needed
              className="labelconfig"
            >
              <Input className="inputconfig"
                type={typeof value === "number" ? "number" : "text"}
                defaultValue={value}
              />
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ offset: 4}}>
            <Button type="primary" htmlType="submit">
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