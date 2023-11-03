import React, { useEffect, useState } from "react";
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg";

function InfoTab() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch(
          "/datas/infotabData/infotabbatamdata.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    return () => fetchJsonData();
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
          {jsonData && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
