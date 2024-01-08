import React, { useState } from "react";
import { Alert } from "antd";
import Senddataform from "./Senddataform";
import "./SenddataTab.css";
import PropTypes from "prop-types";
import axios from "axios";

function SenddataTab({ selectedTerminal, activeTab }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const submitFormWithAxios = async (formData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/tx?dest=${selectedTerminal}`,
        formData || {},
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response.data);
      setIsAlertVisible(true); // Show the alert on successful form submission
    } catch (error) {
      console.error("Error sending data:", error.message);
      setErrorMessage("Error sending data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    // This function will be called when the user closes the alert
    setIsAlertVisible(false);
  };

  return (
    <div className="contents">
      {" "}
      {isAlertVisible && (
        <Alert
          className="Alert"
          message="Ok Success! Data is being transmitted. Please check the Tx Log for the latest status."
          type="success"
          closable
          showIcon
          afterClose={handleAlertClose}
          banner
        />
      )}
      <div className="content">
        <div className="head-content">Send Email</div>

        <div>
          <Senddataform
            activeTab={activeTab}
            selectedTerminal={selectedTerminal}
            submitFormWithAxios={submitFormWithAxios}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

SenddataTab.propTypes = {
  selectedTerminal: PropTypes.number,
  activeTab: PropTypes.string,
};

export default SenddataTab;
