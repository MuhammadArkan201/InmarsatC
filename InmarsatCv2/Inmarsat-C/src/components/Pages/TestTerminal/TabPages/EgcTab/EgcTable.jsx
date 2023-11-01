  import React, { useState, useEffect } from "react";
  import { Table, Modal } from "antd";
  import "./modal.css";
  import "../../../../../App.css";
  import moment from "moment";

  const EgcTable = () => {
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
        render: (text) => convertPriority(text), // Convert sequence to corresponding text
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

    const handleDataClick = async (record) => {
      const messagePopupResponse = await fetch(
        "/datas/egctabData/messagepopup.json"
      );
      const messagePopupData = await messagePopupResponse.json();

      const messageToShow = messagePopupData.data.find(
        (data) => data.sequence === record.sequence
      );

      setSelectedRecord({ ...record, message: messageToShow });
      setOpen(true);
    };

    const handleModalCancel = () => {
      setOpen(false);
    };

    useEffect(() => {
      const fetchJsonData = async () => {
        try {
          const response = await fetch("/datas/egctabData/egctabData.json");
          const jsonData = await response.json();
          console.log("Fetched Data:", jsonData); // Log fetched data
          const dataWithConvertedSequence = jsonData.data.map((record, index) => ({
            ...record,
            key: record.filename || index,
            priority: convertPriority(record.priority), 
          }));
          console.log("Data with Converted Sequence:", dataWithConvertedSequence); // Log after conversion
          setApiResponseData({ data: dataWithConvertedSequence });
        } catch (error) {
          console.error("Error fetching JSON data:", error);
          setApiResponseData({ data: [{ error: "Error fetching data" }] });
        }
      };
  
      fetchJsonData();
    }, []);

    const modalContent = selectedRecord ? (
      <div>
        <p>
          LES {selectedRecord.les} - {selectedRecord.message?.area} -{" "}
          {selectedRecord.message?.message}
        </p>

        {selectedRecord.error && (
          <div>
            <h3>Error Message</h3>
            <p>{selectedRecord.error}</p>
          </div>
        )}
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
            pagination={{ pageSize: 10, position: ["bottomCenter"] }}
            rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "")}
          />
          <Modal
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

  export default EgcTable;