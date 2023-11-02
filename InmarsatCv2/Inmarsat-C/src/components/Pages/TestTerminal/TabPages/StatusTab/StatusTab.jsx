import React, { useState, useEffect } from "react";
import "../../../../../App.css";
import { Button, Select } from "antd";

function StatusTab() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        const response = await fetch("/datas/statusData/statustabbatamData.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data.data["Last Response"]) {
          const lastResponse = data.data["Last Response"];
          const lastResponseUTC = getUTCDate(lastResponse);
          data.data["Last Response (UTC)"] = lastResponseUTC;
          delete data.data["Last Response"];
        }

        setJsonData(data);
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  const getUTCDate = (epochTimestamp) => {
    const date = new Date(epochTimestamp * 1000);
    return date.toUTCString();
  };

  return (
    <div>
      <div className="content">
        <div className="head-content">Device Status</div>
        <div>
          {jsonData && (
            <table className="tbl">
              <tr>
                <th>Last Response</th>
                <td>{jsonData.data["Last Response (UTC)"]}</td>
              </tr>
              {Object.entries(jsonData.data)
                .filter(([key]) => key !== "Last Response (UTC)")
                .map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
            </table>
          )}
        </div>
      </div>
      <div className="content">
        <div className="head-content">Select a Region in the Ocean</div>
        <div>
          Please select your preferred ocean region to set specific parameters, preferences, or configurations.
        </div>
        <Select
          className="Preferred"
          value="Preferred Ocean Region"
          style={{ width: 227 }}
          options={[
            { value: "Preferred Ocean Region", label: "Preferred Ocean Region" },
            { value: "West Atlantic", label: "West Atlantic" },
            { value: "East Atlantic", label: "East Atlantic" },
            { value: "Pacific", label: "Pacific" },
            { value: "Indian", label: "Indian" },
            { value: "None", label: "None" },
          ]}
        />
        <Button className="btn">Set Region</Button>
      </div>
    </div>
  );
}

export default StatusTab;
