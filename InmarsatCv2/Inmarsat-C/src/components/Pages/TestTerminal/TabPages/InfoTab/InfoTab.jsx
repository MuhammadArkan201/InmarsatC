import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg";

function InfoTab({ selectedTerminal }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchJsonData = () => {
      // Check if selectedTerminal is null
      if (selectedTerminal === null) {
        setErrorMessage("Please select a terminal site");
        return Promise.resolve(null);
      }

      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        `https://5058acfc-6112-4c38-9269-ec42d60e35bc.mock.pstmn.io/info?dest=${selectedTerminal}`,
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

        xhr.send();
      });
    };

    setLoading(true);

    return () => fetchJsonData()
      .then((postData) => {
        setJsonData(postData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTerminal]);

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device</div>
        <div className="img-container">
          <img src={UTTerminalImage} alt="UT Terminal" />
        </div>
      </div>
      <div className="content">
        <div className="head-content">Device Information</div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            jsonData && (
              <table className="tbl">
                <tbody>
                  {Object.entries(jsonData.data).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{key === 'isSerialConnected' ? (value ? 'True' : 'False') : value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
}

InfoTab.propTypes = {
  selectedTerminal: PropTypes.number, // Adjust the prop type accordingly
};

export default InfoTab;
