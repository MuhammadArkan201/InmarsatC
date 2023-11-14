import React, { useEffect, useState } from "react";
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg";

function InfoTab() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/6552e4ec54105e766fcfb258",
          {
            headers: {
              'X-Master-Key': '$2a$10$FXmzFTPkKCsz6s7v4ayi8.MxKr9HT64IlQGyObHjs0twnRvB1.vxe',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok (status: ${response.status})`);
        }

        const responseData = await response.json();
        const data = responseData.record.data; // Access data under the "record" key

        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    return () => fetchJsonData();
  }, []);

  // Log the jsonData to inspect its structure
  console.log(jsonData);

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
          {jsonData ? (
            <table className="tbl">
              <tbody>
                {Object.entries(jsonData).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
