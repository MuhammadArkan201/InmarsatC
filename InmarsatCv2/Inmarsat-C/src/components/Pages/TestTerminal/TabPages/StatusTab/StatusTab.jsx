import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PopupStatus from "../../../../Popup/PopupStatus";

function StatusTab({ selectedTerminal, activeTab }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [preferredOcean, setPreferredOcean] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const fetchJsonData = async () => {
      if (activeTab !== "Statustab" || selectedTerminal === null) {
        setErrorMessage("Please select a terminal site");
        return Promise.resolve(null);
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/status?dest=${selectedTerminal}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      if (!isInitialRender && selectedTerminal !== null) {
        try {
          const postData = await fetchJsonData();
          setJsonData(postData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setIsInitialRender(false);
    };

    fetchData();
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

  const handleSelectChange = (value, label) => {
    setPreferredOcean(label);
  };

  const updatePreferredOcean = async ({
    selectedOption,
    firstResponseData,
    secondResponseData,
  }) => {
    const itemToUpdate = jsonData.find((item) => item.dest === selectedTerminal);
  
    if (!itemToUpdate) {
      console.error("Item not found for update");
      return;
    }
  
    const updatedItem = {
      ...itemToUpdate,
      data: {
        ...itemToUpdate.data,
        preferredOcean: selectedOption,
      },
    };
  
    try {
      const response = await fetch(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/status?dest=${selectedTerminal}`,
        {
          method: "POST", // Use POST for updates
          headers: {
          },
          body: JSON.stringify(updatedItem),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      console.log("Preferred Ocean Updated Successfully");
      setJsonData((prevData) =>
        prevData.map((item) =>
          item.dest === selectedTerminal ? updatedItem : item
        )
      );
      setPreferredOcean(selectedOption);
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
