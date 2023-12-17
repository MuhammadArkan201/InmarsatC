import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import "./egcTable.css";
import moment from "moment";
import PropTypes from "prop-types";

const EgcTable = ({ rangePickerValue, tableData, selectedTerminal }) => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [apiResponseData, setApiResponseData] = useState({ data: [] });

  const convertPriority = (priority) => {
    if (priority === 1) {
      return "Safety";
    } else if (priority === 2) {
      return "Urgency";
    }
    return priority;
  };

  const convertTimestamp = (epochTime) => {
    return moment.unix(epochTime).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
    {
      title: "Les",
      dataIndex: "les",
      key: "les",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => convertPriority(text),
    },
    {
      title: "Lang",
      dataIndex: "lang",
      key: "lang",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => convertTimestamp(text),
    },
    {
      title: "Bytes",
      dataIndex: "bytes",
      key: "bytes",
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      title: "Error",
      dataIndex: "error",
      key: "error",
    },
    {
      title: "Repetition",
      dataIndex: "repetition",
      key: "repetition",
    },
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "Data",
      key: "operation",
      render: (_, record) => (
        <a onClick={() => handleDataClick(record)}>Read</a>
      ),
    },
  ];
  
  const [messagePopupData, setMessagePopupData] = useState(null);

  const handleDataClick = (record) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open("GET", `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/directory?dest=${selectedTerminal}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const messagePopupData = JSON.parse(xhr.responseText);
        console.log("API Response:", messagePopupData);
        setMessagePopupData(messagePopupData[0]?.data);
        setSelectedRecord({ ...record, message: messagePopupData });
        setOpen(true);
      } else {
        console.error("Request failed with status:", xhr.status);
      }
    };

    xhr.onerror = function () {
      console.error("Network request failed");
    };

    xhr.send();
  };
  
  const handleModalCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("Selected date range: ", rangePickerValue);

    const apiData = tableData[0]; // Assuming the data is an array with the first element containing the actual data

    if (apiData) {
      const transformedData = apiData.data.map((item) => {
        return {
          les: item[0],
          service: item[1],
          priority: item[2],
          lang: item[3],
          timestamp: item[4],
          bytes: item[5],
          sequence: item[6],
          error: item[7],
          repetition: item[8],
          filename: item[9],
        };
      });

      const filteredData = transformedData.filter((item) => {
        const timestamp = item.timestamp; // Adjust this line based on your data structure
        const [startDate, endDate] = rangePickerValue;

        // Convert timestamp to seconds if it's in milliseconds
        const timestampInSeconds =
          timestamp < 1e12 ? timestamp : Math.floor(timestamp / 1000);

        console.log(
          "Timestamp, Start, End: ",
          moment(timestampInSeconds).format("YYYY-MM-DD HH:mm"),
          startDate.unix(),
          endDate.unix()
        );

        return (
          timestampInSeconds >= startDate.unix() &&
          timestampInSeconds <= endDate.unix()
        );
      });

      console.log("Transformed Data: ", transformedData);
      console.log("Filtered Data: ", filteredData);

      setApiResponseData({ data: filteredData });
    }
  }, [rangePickerValue, tableData]);

  const modalContent = messagePopupData ? (
    <div className="box">
      {messagePopupData[3].split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  ) : (
    <div>No data available</div>
  );

  const modalWidth = "50%";
  
  const totalRecords =
    apiResponseData.count ||
    (apiResponseData.data ? apiResponseData.data.length : 0);

  return (
    <div className="contents">
      <div className="titletbl">Total Records: {totalRecords}</div>

      <div>
        <Table
          size="small"
          columns={columns.map((col) => {
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
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "")}
          scroll={{ x: 768 }}
        />
        <Modal
          className="msg-popup-modal"
          title="Messages"
          open={open}
          onCancel={handleModalCancel}
          footer={null}
          width={modalWidth} // Set the width here
          centered={true}
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

EgcTable.propTypes = {
  rangePickerValue: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  selectedTerminal: PropTypes.number.isRequired,
};

export default EgcTable;
