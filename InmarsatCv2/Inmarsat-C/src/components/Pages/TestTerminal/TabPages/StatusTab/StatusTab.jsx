import React, { useState } from "react";
import "../../../../../App.css";
import { Button, Select } from "antd";

function StatusTab() {
  const initialData = {
    error: "",
    data: {
      lastResponse: 1697159166,
      sync: "Yes",
      tdmType: "NCS",
      tdmChannel: "12580",
      currentChannel: "NCS",
      currentProtocol: "Free",
      tdmOrigin: "244 (Pacific)",
      tdmFrameNumber: "457",
      bbErrorRate: "0",
      preferredOcean: "Pacific",
    },
  };

  const [responseData, setResponseData] = useState(initialData);
  const [selectedRegion, setSelectedRegion] = useState("Preferred Ocean Region");

  const statusItems = Object.entries(responseData.data).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ));

  const lastResponse = responseData.data.lastResponse;
  const sync = responseData.data.sync;
  const tdmType = responseData.data.tdmType;
  const tdmChannel = responseData.data.tdmChannel;
  const currentChannel = responseData.data.currentChannel;
  const currentProtocol = responseData.data.currentProtocol;
  const tdmOrigin = responseData.data.tdmOrigin;
  const tdmFrameNumber = responseData.data.tdmFrameNumber;
  const bbErrorRate = responseData.data.bbErrorRate;
  const preferredOcean = responseData.data.preferredOcean;

  const handleRegionChange = (value) => {
    setSelectedRegion(value);

    let preferredOcean = "Pacific";

    if (value === "West Atlantic") {
      preferredOcean = "West Atlantic";
    } else if (value === "East Atlantic") {
      preferredOcean = "East Atlantic";
    } else if (value === "Pacific") {
      preferredOcean = "Pacific";
    } else if (value === "Indian") {
      preferredOcean = "Indian";
    } else if (value === "None") {
      preferredOcean = "None";
    }

    setResponseData({
      error: "",
      data: {
        ...responseData.data,
        preferredOcean,
      },
    });
  };

  return (
    <div>
      <div className="content">
        <div className="head-content">Device Status</div>
        <div>
          <table className="tbl">
            <tr>
              <th>last Response</th>
              <td>{lastResponse}</td>
            </tr>
            <tr>
              <th>sync</th>
              <td>{sync}</td>
            </tr>
            <tr>
              <th>tdmType</th>
              <td>{tdmType}</td>
            </tr>
            <tr>
              <th>tdmChannel</th>
              <td>{tdmChannel}</td>
            </tr>
            <tr>
              <th>currentChannel</th>
              <td>{currentChannel}</td>
            </tr>
            <tr>
              <th>currentProtocol</th>
              <td>{currentProtocol}</td>
            </tr>
            <tr>
              <th>tdmOrigin</th>
              <td>{tdmOrigin}</td>
            </tr>
            <tr>
              <th>tdmFrameNumber</th>
              <td>{tdmFrameNumber}</td>
            </tr>
            <tr>
              <th>bbErrorRate</th>
              <td>{bbErrorRate}</td>
            </tr>
            <tr>
              <th>preferredOcean</th>
              <td>{preferredOcean}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="content">
        <div className="head-content">Select a Region in the Ocean</div>
        <div>
          Please select your preferred ocean region to set specific parameters,
          preferences, or configurations.
        </div>
        <Select
          className="Preferred"
          value={selectedRegion}
          style={{ width: 227 }}
          onChange={handleRegionChange}
          options={[
            {
              value: "Preferred Ocean Region",
              label: "Preferred Ocean Region",
            },
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
