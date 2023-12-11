import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PopupStatus from "../../../../Popup/PopupStatus";

function StatusTab({ selectedTerminal, activeTab }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [preferredOcean, setPreferredOcean] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const fetchJsonDataXHR = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `datas/statusData/statustabbatamData.json`;

      xhr.open("GET", url, true);

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error(`XHR request failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = function () {
        reject(new Error("XHR request failed"));
      };

      xhr.send();
    });
  };

  useEffect(() => {
    const fetchData = () => {
      if (activeTab !== "Statustab" || selectedTerminal === null) {
        return Promise.resolve(null);
      }

      setLoading(true);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `datas/statusData/statustabbatamData.json`,
        true
      );

      return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } else {
              reject(
                new Error(
                  `Network response was not ok: ${xhr.status}`
                )
              );
            }
          }
        };

        xhr.onerror = function () {
          reject(new Error("XHR request failed"));
        };

        xhr.send();
      });
    };

    if (!isInitialRender && selectedTerminal !== null) {
      setLoading(true);

      fetchData()
        .then((postData) => {
          setJsonData(postData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

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
        `datas/statusData/statustabbatamData.json`,
        {
          method: "POST", // Use POST for updates
          headers: {},
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
