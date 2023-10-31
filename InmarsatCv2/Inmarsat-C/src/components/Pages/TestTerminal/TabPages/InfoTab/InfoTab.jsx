import "../../../../../App.css";
import React, { useEffect, useState } from 'react';
import UTTerminalImage from "../../../../Img/UT-terminalBatam.jpeg"; // Make sure to adjust the image path


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
      isSerialConnected: "True",
      hostUptime: 42498717,
      applicationUptime: 19848069,
    },
  };

  const serialNumber = data.data.serialNumber;
  const terminalType = data.data.terminalType;
  const mobileNumber = data.data.mobileNumber;
  const mobileType = data.data.mobileType;
  const ISNnumber = data.data.ISNnumber;
  const HWid = data.data.HWid;
  const latitude = data.data.latitude;
  const longitude = data.data.longitude;
  const altitude = data.data.altitude;
  const GPStime = data.data.GPStime;
  const isSerialConnected = data.data.isSerialConnected;
  const hostUptime = data.data.hostUptime;
  const applicationUptime = data.data.applicationUptime;

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
          <table className="tbl">
            <tr>
              <th>Serial Number</th>
              <td>{serialNumber}</td>
            </tr>
            <tr>
              <th>Terminal Type</th>
              <td>{terminalType}</td>
            </tr>
            <tr>
              <th>Mobile Number</th>
              <td>{mobileNumber}</td>
            </tr>
            <tr>
              <th>Mobile Type</th>
              <td>{mobileType}</td>
            </tr>
            <tr>
              <th>ISN Number</th>
              <td>{ISNnumber}</td>
            </tr>
            <tr>
              <th>HW Id</th>
              <td>{HWid}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{latitude}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{longitude}</td>
            </tr>
            <tr>
              <th>Altitude</th>
              <td>{altitude}</td>
            </tr>
            <tr>
              <th>GPS Time</th>
              <td>{GPStime}</td>
            </tr>
            <tr>
              <th>Is Serial Connected</th>
              <td>{isSerialConnected}</td>
            </tr>
            <tr>
              <th>Host Uptime</th>
              <td>{hostUptime}</td>
            </tr>
            <tr>
              <th>Application Uptime</th>
              <td>{applicationUptime}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
