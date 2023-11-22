import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg";

function InfoTab({ selectedTerminal }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const fetchJsonData = () => {
      if (selectedTerminal === null) {
        setErrorMessage("Please select a terminal site");
        return Promise.resolve(null);
      }

      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/info?dest=${selectedTerminal}`,
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

    if (!isInitialRender && selectedTerminal !== null) {
      setLoading(true);

      fetchJsonData()
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
  }, [selectedTerminal, isInitialRender]);

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
                  {jsonData.map((item) =>
                    Object.entries(item.data).map(([key, value]) => (
                      <tr key={key}>
                        <th>{key}</th>
                        <td>
                          {typeof value === "boolean"
                            ? value
                              ? "True"
                              : "False"
                            : value}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

InfoTab.propTypes = {
  selectedTerminal: PropTypes.number,
};

export default InfoTab;
