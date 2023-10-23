import { useState } from "react";
import "../../../../../App.css";
import { Button, Select } from "antd";

function StatusTab() {
  const initialData = {
    error: "",
    data: {
      lastResponse: 1697159166,
      sync: "yes",
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
  const [selectedRegion, setSelectedRegion] = useState(
    "Preferred Ocean Region"
  );

  const statusItems = Object.entries(responseData.data).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ));

  const handleRegionChange = (value) => {
    setSelectedRegion(value);

    // Update the preferredOcean based on the selected region
    let preferredOcean = "Pacific"; // Default value

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
        <div>{statusItems}</div>
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
