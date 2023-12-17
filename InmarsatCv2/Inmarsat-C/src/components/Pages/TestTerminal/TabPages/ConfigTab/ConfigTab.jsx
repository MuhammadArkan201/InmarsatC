import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import axios from "axios";

function ConfigTab({ selectedTerminal, activeTab }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const fetchJsonData = () => {
    if (activeTab !== "Configtab" || selectedTerminal === null) {
      return Promise.resolve(null);
    }

    return axios
      .get(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config?dest=${selectedTerminal}`
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching data: ${error.message}`);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTerminal !== null) {
        setLoading(true);

        try {
          const response = await fetchJsonData();
          setJsonData(response);
        } catch (error) {
          console.error("Error fetching data:", error);
          setErrorMessage("An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedTerminal, activeTab]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Your logic to handle form submission, e.g., make an API call
      // await axios.post('/api/submitForm', values);
      console.log("Form submitted:", values);
    } catch (error) {
      console.error("Form submission error:", error);
      if (error.response) {
        setErrorMessage(
          `Server responded with an error: ${error.response.status}`
        );
      } else if (error.request) {
        setErrorMessage("No response received from the server");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const initialValues = jsonData?.[0]?.data || {};

  return (
    <Form onFinish={onFinish} form={form} initialValues={initialValues}>
      {Object.entries(initialValues).map(([key, value]) => (
        <Form.Item key={key} label={key} name={key}>
          <Input
            type={typeof value === "number" ? "number" : "text"}
            defaultValue={value}
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

ConfigTab.propTypes = {
  selectedTerminal: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default ConfigTab;