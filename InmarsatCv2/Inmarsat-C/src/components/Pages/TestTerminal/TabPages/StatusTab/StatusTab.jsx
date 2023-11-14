import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../../../App.css";
import { Modal } from "antd";
import PopupStatus from "../../../../Popup/PopupStatus";

// ... (imports)

function StatusTab({ handleSelectChange }) {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "/datas/statusData/statustabbatamData.json", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);

              // Check if "Last Response" exists and modify it
              if (data.data["Last Response"] !== undefined) {
                const lastResponse = data.data["Last Response"];
                const lastResponseUTC = getUTCDate(lastResponse);
                data.data["Last Response (UTC)"] = lastResponseUTC;
              }
              // Remove "Last Response" key, whether modified or not
              delete data.data["Last Response"];

              resolve(data);
            } else {
              reject(new Error(`Network response was not ok: ${xhr.status}`));
            }
          }
        };

        xhr.onerror = function () {
          reject(new Error("There was an error with the XHR request"));
        };

        // Replace the following line with your actual payload
        const payload = JSON.stringify({ key: "value" });

        xhr.send(payload);
      });
    };

    try {
      return () =>
        fetchData()
          .then((data) => {
            setJsonData(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    } catch (error) {
      console.error("Error initiating XHR request:", error);
    }

    return () => fetchData();
  }, []);

  const getUTCDate = (epochTimestamp) => {
    const date = new Date(epochTimestamp * 1000); // Convert seconds to milliseconds
    return date.toUTCString();
  };

  const orderedKeys = [
    "Last Response (UTC)",
    "Sync",
    "TDM Type",
    "TDM Channel",
    "Current Channel",
    "Current Protocol",
    "TDM Origin",
    "TDM Frame Number",
    "BB Error Rate",
    "Preferred Ocean",
    // Add this line to keep "Last Response" at the bottom
  ];

  const onChange = (value) => {
    handleSelectChange(value);
  };

  const updatePreferredOcean = async ({ selectedOption, firstResponseData, secondResponseData }) => {
    try {
      const response = await fetch("/datas/statusData/statustabbatamData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      data.data["Preferred Ocean"] = selectedOption;
      
      // Use firstResponseData and secondResponseData as needed
  
      // Update the state to trigger a re-render
      setJsonData(data);
    } catch (error) {
      console.error("Error updating Preferred Ocean:", error);
    }
  };
  

return (
    <div>
      <div className="content">
        <div className="head-content">Device Status</div>
        <div>
          {jsonData && (
            <table className="tbl">
              <tbody>
                {orderedKeys.map((key) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>
                      {key === "Last Response"
                        ? getUTCDate(jsonData.data[key])
                        : jsonData.data[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="content">
        <div className="head-content">Select a Region in the Ocean</div>
        <div>
          Please select your preferred ocean region to set specific parameters,
          preferences, or configurations.
        </div>
        <PopupStatus
          updatePreferredOcean={updatePreferredOcean}
          handleSelectChange={onChange}
        />
      </div>
    </div>
  );
}

StatusTab.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
};

export default StatusTab;