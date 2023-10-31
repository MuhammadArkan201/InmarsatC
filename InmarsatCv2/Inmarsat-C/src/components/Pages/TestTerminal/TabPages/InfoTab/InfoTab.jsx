import "../../../../../App.css";
import React, { useEffect, useState } from "react";
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg";

function InfoTab() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device</div>
        <div className="img-container">
          {" "}
          <img src={UTTerminalImage} alt="UT Terminal" />
          <div></div>{" "}
        </div>
      </div>
      <div className="content">
        <div className="head-content">Device Information</div>
        <div>
          {jsonData && (
            <table className="tbl">
              {Object.entries(jsonData.data).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
