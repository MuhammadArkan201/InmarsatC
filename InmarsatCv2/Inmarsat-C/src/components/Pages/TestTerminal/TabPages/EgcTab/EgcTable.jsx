import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import "./egcTable.css";
import moment from "moment";
import PropTypes from "prop-types";

const EgcTable = ({ rangePickerValue, tableData }) => {
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

  const handleDataClick = async (record) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/datas/egctabData/messagepopup.json", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const messagePopupData = JSON.parse(xhr.responseText);

          const messageToShow = messagePopupData.data.find(
            (data) => data.sequence === record.sequence
          );

          setSelectedRecord({ ...record, message: messageToShow });
          setOpen(true);
        } else {
          console.error(`Network response was not ok: ${xhr.status}`);
        }
      }
    };

    xhr.onerror = function () {
      console.error("There was an error with the XHR request");
    };

    // Replace the following line with your actual payload
    const payload = JSON.stringify({ key: "value" });

    xhr.send(payload);
  };

  const handleModalCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("Selected date range: ", rangePickerValue); // Check the selected date range

    const filteredData = tableData.filter((item) => {
      const timestamp = item.timestamp;
      const [startDate, endDate] = rangePickerValue;

      console.log(
        "Timestamp, Start, End: ",
        timestamp,
        startDate.unix(),
        endDate.unix()
      ); // Verify timestamp and range values

      // Filter the data based on the date range selected
      return timestamp >= startDate.unix() && timestamp <= endDate.unix();
    });

    console.log("Filtered Data: ", filteredData); // Log the filtered data

    setApiResponseData({ data: filteredData });
  }, [rangePickerValue, tableData]);

  const modalContent = selectedRecord ? (
    <div>
      <p>
        LES {selectedRecord.les} - {selectedRecord.message?.msg} -{" "}
        {selectedRecord.message?.area} -{" "}
        {selectedRecord.message?.message.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  ) : null;

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
          dataSource={apiResponseData.data} // Update this line
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "")}
          scroll={{ x: 768 }} // Horizontal scroll at 768px screen width
        />
        <Modal
          className="msg-popup-modal"
          title="Message"
          open={open}
          onCancel={handleModalCancel}
          footer={null}
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
};

export default EgcTable;
