// StatusTab.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../../../App.css";
import PopupStatus from "../../../../Popup/PopupStatus";

function StatusTab({ selectedTerminal, activeTab }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [preferredOcean, setPreferredOcean] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true); 

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        // Check if the current tab is active before making the API call
        if (activeTab !== "Statustab" || selectedTerminal === null) {
          return;
        }

        setLoading(true);

        const response = await fetch(
          `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/status?dest=${selectedTerminal}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const postData = await response.json();
        setJsonData(postData);
        console.log(postData); // Log the data to the console
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if the current tab is active and it's not the initial render
    if (!isInitialRender) {
      fetchJsonData();
    }

    // Update isInitialRender after the first render
    setIsInitialRender(false);
  }, [selectedTerminal, isInitialRender, activeTab]);

  const getUTCDate = (epochTimestamp) => {
    const date = new Date(epochTimestamp * 1000);
    return date.toUTCString();
  };

  const getProperties = (data) => {
    const { lastResponse, ...otherProperties } = data;

    return Object.entries(otherProperties).map(([key, value]) => (
      <tr key={key}>
        <th>{key}:</th>
        <td>{value}</td>
      </tr>
    ));
  };

  const handleSelectChange = (value) => {
    setPreferredOcean(value);
  };

  const updatePreferredOcean = async ({ selectedOption, firstResponseData, secondResponseData }) => {
    // Update the preferredOcean in the JSON data
    const updatedJsonData = jsonData.map((item) => {
      if (item.dest === selectedTerminal) {
        return {
          ...item,
          data: {
            ...item.data,
            preferredOcean: selectedOption,
          },
        };
      }
      return item;
    });

    // Implement the logic to update the API with the updated JSON data
    // This is a placeholder, you may need to replace it with your API endpoint and method
    try {
      const response = await fetch(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/status/${selectedTerminal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJsonData),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      console.log("Preferred Ocean Updated Successfully");

      // Now, you can set the updated JSON data
      setJsonData(updatedJsonData);
    } catch (error) {
      console.error("Error updating preferred ocean:", error);
    }
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Status</div>
        <div>
          {loading ? (
            <p>Loading data for terminal {selectedTerminal}...</p>
          ) : (
            jsonData && (
              <table className="tbl">
                <tbody>
                  {jsonData.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th>Last Response Time:</th>
                        <td>{getUTCDate(item.data.lastResponse)}</td>
                      </tr>
                      {getProperties(item.data)}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>

      <div className="content">
        <div className="head-content">Select a Region in the Ocean</div>
        <div>
          <PopupStatus
            handleSelectChange={handleSelectChange}
            updatePreferredOcean={updatePreferredOcean}
          />
        </div>
      </div>
    </div>
  );
}

StatusTab.propTypes = {
  selectedTerminal: PropTypes.number,
  activeTab: PropTypes.string,
};

export default StatusTab;
