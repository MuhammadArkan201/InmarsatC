import { useEffect, useState } from "react";
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg";

function InfoTab() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJsonData = () => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(
          "POST",
          "../src/components/Data/Batam/infoTab/infotabbatamdata.json",
          true
        );
        xhr.setRequestHeader(
          "X-Master-Key",
          "$2a$10$FXmzFTPkKCsz6s7v4ayi8.MxKr9HT64IlQGyObHjs0twnRvB1.vxe"
        );

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

        xhr.send(JSON.stringify({}));
      });
    };

    try {
      setLoading(true);

      return () =>
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
    } catch (error) {
      console.error("Error initiating XHR request:", error);
    }

    return () => fetchJsonData;
  }, []); // Empty dependency array ensures this effect runs only once

  // Optional: If you want to prevent any additional requests, you can use the following
  useEffect(() => {
    const abortController = new AbortController();

    return () => abortController.abort();
  }, []);

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
                      <td>{value}</td>
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

export default InfoTab;
