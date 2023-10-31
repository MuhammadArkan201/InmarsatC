import React, { useState } from "react";
import { Table, Modal } from "antd";
import "./modal.css"
import "../../../../../App.css";
import moment from "moment"

const columns = [
  {
    title: "Les",
    dataIndex: "les",
    key: "les",
    width: 60,
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
    width: 380,
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    width: 90,
  },
  {
    title: "Lang",
    dataIndex: "lang",
    key: "lang",
    width: 90,
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    width: 220,
    render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Bytes",
    dataIndex: "bytes",
    key: "bytes",
    width: 100,
  },
  {
    title: "Sequence",
    dataIndex: "sequence",
    key: "sequence",
    width: 130,
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error",
    width: 90,
  },
  {
    title: "Repetition",
    dataIndex: "repetition",
    key: "repetition",
    width: 90,
  },
  {
    title: "Filename",
    dataIndex: "filename",
    key: "filename",
    width: 100,
  },
  {
    title: "Data",
    key: "operation",
    width: 70,
    render: (_, record) => (
      <a onClick={() => handleDataClick(record)}>Read</a>
    ),
  },
];

const message ={
  data : ["MSG 16095 - NAV/METAREA Safety Call to Area: 11 - PosOk\n\n0000086900\n00062\nWWHK80 VHHH 230000\n40:1:31:11:01:00\nHONG KONG METEOROLOGICAL SERVICE PROVIDES THE FOLLOWING\nWARNING/INFORMATION FOR THE SOUTH CHINA SEA.\nWARNINGS\nNIL.\nSYNOPSIS (230000UTC) AND 24-HOUR FORECAST\nUNSETTLED WEATHER IS AFFECTING NORTHWESTERN AND CENTRAL\nPARTS OF THE SOUTH CHINA SEA (SCS)","SEAS EAST OF LUZON AND\nGULF OF THAILAND.\nSIGNIFICANT SWELL/HIGH SEAS\nSWELL E TO NE 3 M OVER TAIWAN STRAIT","NORTHEASTERN PART OF\nTHE SCS AND LUZON STRAIT.\nTHUNDERSTORMS/SEVERE WEATHER\nSCATTERED HEAVY SQUALLY (SQ) SHOWERS (SH) AND THUNDERSTORMS\n(TS) OVER NORTHWESTERN AND CENTRAL PARTS OF THE SCS","SEAS\nEAST OF LUZON AND GULF OF THAILAND.\nISOLATED SQ SH AND TS OVER SEAS NEAR SOUTHERN PART OF THE\nPHILIPPINES","SOUTHERN PART OF THE SCS AND SEAS NEAR\nMALAYSIA.\nSEA FOG/REDUCED VISIBILITY\nVISIBILITY DOWN TO 2000 M IN SQ SH AND TS."]
}
const data = {
  data: [
    [211, 31, 1, 0, 1698027720, 855, 16095, 0, 1, "EGC.759"],
    [203, 31, 1, 0, 1698028260, 2139, 19773, 0, 1, "EGC.760"],
    [230, 44, 2, 0, 1698036600, 543, 23779, 0, 8, "EGC.761"],
    [230, 44, 2, 0, 1698039660, 740, 23775, 0, 10, "EGC.762"],
    [212, 31, 1, 0, 1698040920, 550, 4826, 0, 9, "EGC.763"],
    [212, 31, 1, 0, 1698040920, 550, 4827, 0, 9, "EGC.764"],
    [211, 31, 1, 0, 1698044580, 1610, 16096, 0, 1, "EGC.765"],
    [203, 31, 1, 0, 1698045480, 1040, 19774, 0, 1, "EGC.766"],
    [211, 31, 1, 0, 1698049380, 797, 16097, 0, 1, "EGC.767"],
    [203, 31, 1, 0, 1698049560, 1879, 19775, 0, 1, "EGC.768"],

    [1, 31, 1, 0, 1698027720, 855, 16095, 0, 1, "EGC.759"],
    [2, 31, 1, 0, 1698028260, 2139, 19773, 0, 1, "EGC.760"],
    [3, 44, 2, 0, 1698036600, 543, 23779, 0, 8, "EGC.761"],
    [4, 44, 2, 0, 1698039660, 740, 23775, 0, 10, "EGC.762"],
    [5, 31, 1, 0, 1698040920, 550, 4827, 0, 9, "EGC.764"],
    [6, 31, 1, 0, 1698040920, 550, 4826, 0, 9, "EGC.763"],
    [7, 31, 1, 0, 1698044580, 1610, 16096, 0, 1, "EGC.765"],
    [8, 31, 1, 0, 1698045480, 1040, 19774, 0, 1, "EGC.766"],
    [9, 31, 1, 0, 1698049380, 797, 16097, 0, 1, "EGC.767"],
    [10, 31, 1, 0, 1698049560, 1879, 19775, 0, 1, "EGC.768"],
  ],
};



const mapPriority = (value) => {
  if (value === 1) {
    return "Safety";
  } else if (value === 2) {
    return "Urgent";
  }
  return value;
};

const apiResponseData = {
  error: "",
  columns: [
    "les",
    "service",
    "priority",
    "lang",
    "timestamp",
    "bytes",
    "sequence",
    "error",
    "repetition",
    "filename",
  ],
  data: data.data.map((item) => {
    const timestamp = new Date(item[4] * 1000);
    const formattedTimestamp = `${timestamp.getUTCFullYear()}-${
      timestamp.getUTCMonth() + 1
    }-${timestamp.getUTCDate()} ${timestamp.getUTCHours()}:${timestamp.getUTCMinutes()}:${timestamp.getUTCSeconds()}`;

    return {
      les: item[0],
      service: item[1],
      priority: mapPriority(item[2]),
      lang: item[3],
      timestamp: formattedTimestamp,
      bytes: item[5],
      sequence: item[6],
      error: item[7],
      repetition: item[8],
      filename: item[9],
    };
  }),
  count: data.data.length,
};

const EgcTable = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDataClick = (record) => {
    const messageIndex = record.sequence - 16095;
    const messageToShow = message.data[messageIndex];
    setSelectedRecord({ ...record, message: messageToShow });
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const modalContent = selectedRecord ? (
    <div>
    <p>
      {selectedRecord.filename} - {selectedRecord.timestamp}
    </p>
    <p>
      {selectedRecord.service} - LES {selectedRecord.les} -{" "}
      {selectedRecord.message && (
        <div>
          <p>{selectedRecord.message}</p>
        </div>
      )}
    </p>

    {selectedRecord.error && (
      <div>
        <h3>Error Message</h3>
        <p>{selectedRecord.error}</p>
      </div>
    )}
  </div>
  ) : null;

  return (
    <div className="contents">
      <div className="titletbl">Total Records: {apiResponseData.count}</div>
      <div><Table
        columns={columns.map(col => {
          if (col.key === "operation") {
            return {
              ...col,
              render: (_, record) => (
                <a onClick={() => handleDataClick(record)}>Read</a>
              ),
            };
          }
          return col;
        })}
        bordered={true}
        dataSource={apiResponseData.data}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "even-row" : ""
        }
      />
      <Modal
        title="Message"
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {modalContent}
      </Modal></div>
    </div>
  );
};

export default EgcTable;