// import React from 'react';
import "../../../../App.css";

function InfoTab() {
  const data = {
    error: "",
    data: {
      serialNumber: "21163457",
      terminalType: "Inmarsat-C Transceiver",
      mobileNumber: "400022211",
      mobileType: "TT-3027C SOLAS Maritime",
      ISNnumber: "4TT094ac823c",
      HWid: "1",
      latitude: "01 04 95 N",
      longitude: "104 01 76 E",
      altitude: "410",
      GPStime: "21:04:05 UTC",
      isSerialConnected: true,
      hostUptime: 42498717,
      applicationUptime: 19848069,
    },
  };

  const infoItems = Object.entries(data.data).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ));

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device</div>
        <div></div>
      </div>
      <div className="content">
        <div className="head-content">Device Information</div>
        <div>{infoItems}</div>
      </div>
    </div>
  );
}

export default InfoTab;
