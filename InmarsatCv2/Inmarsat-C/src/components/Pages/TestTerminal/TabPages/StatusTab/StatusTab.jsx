import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../../../App.css";
import PopupStatus from "../../../../Popup/PopupStatus";

function StatusTab({ selectedTerminal }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchJsonData = () => {
      // Check if selectedTerminal is null
      console.log("Selected Terminal:", selectedTerminal);
      if (selectedTerminal === null) {
        setErrorMessage("Please select a terminal site");
        return Promise.resolve(null);
      }

      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        `https://5058acfc-6112-4c38-9269-ec42d60e35bc.mock.pstmn.io/status?dest=${selectedTerminal}`,
        true
      );
      xhr.setRequestHeader(
        "X-Master-Key",
        "$2a$10$FXmzFTPkKCsz6s7v4ayi8.MxKr9HT64IlQGyObHjs0twnRvB1.vxe"
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
                  `Network response for POST request was not ok: ${xhr.status}`
                )
              );
            }
          }
        };

        xhr.onerror = function () {
          reject(new Error("There was an error with the XHR request"));
        };

        xhr.send(JSON.stringify({ key: "value" }));
      });
    };

    setLoading(true);

    fetchJsonData()
      .then((postData) => {
        postData.data = {
          "Last Response (UTC)": getUTCDate(postData.lastResponse),
          Sync: postData.sync,
          "TDM Type": postData.tdmType,
          "TDM Channel": postData.tdmChannel,
          "Current Channel": postData.currentChannel,
          "Current Protocol": postData.currentProtocol,
          "TDM Origin": postData.tdmOrigin,
          "TDM Frame Number": postData.tdmFrameNumber,
          "BB Error Rate": postData.bbErrorRate,
          "Preferred Ocean": postData.preferredOcean,
        };

        setJsonData(postData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => fetchJsonData; // Return the promise directly
  }, [selectedTerminal]);

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
  ];

  return (
    <div>
      <div className="content">
        <div className="head-content">Device Status</div>
        <div>
        {loading ? (
  <p>Loading...</p>
) : (
  jsonData && (
    <table className="tbl">
      <tbody>
        {orderedKeys.map((key) => (
          <tr key={key}>
            <th>{key}</th>
            <td>
              {jsonData.data
                ? key === "Last Response"
                  ? getUTCDate(jsonData.data[key])
                  : jsonData.data[key]
                : key === "Last Response"
                ? getUTCDate(jsonData[key])
                : jsonData[key]}
            </td>
          </tr>
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
          Please select your preferred ocean region to set specific parameters,
          preferences, or configurations.
        </div>
        <PopupStatus />
      </div>
    </div>
  );
}

StatusTab.propTypes = {
  selectedTerminal: PropTypes.number,
  handleSelectChange: PropTypes.func.isRequired,
};

export default StatusTab;
