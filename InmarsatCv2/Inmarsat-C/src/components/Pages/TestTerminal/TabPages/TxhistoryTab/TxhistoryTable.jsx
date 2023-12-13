import { useState, useEffect } from "react";
import { Table } from "antd";
import "./TxhistoryTable.css";
import moment from "moment";
import PropTypes from "prop-types";

const TxhistoryTable = ({ rangePickerValue, tableData }) => {
  const [apiResponseData, setApiResponseData] = useState({ data: [] });

  const convertTimestamp = (epochTime) => {
    return moment.unix(epochTime).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => convertTimestamp(text),
    },
    {
      title: "Parameters",
      dataIndex: "parameters",
      key: "parameters",
      render: (data) => <pre className="content-pre-content">{data}</pre>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (data) => <pre className="content-pre-content">{data}</pre>,
    },
    {
      title: "No. Service",
      dataIndex: "service_number",
      key: "service_number",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Bytes",
      dataIndex: "bytes",
      key: "bytes",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Network Type",
      dataIndex: "network_type",
      key: "network_type",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Alarm",
      dataIndex: "is_alarm_tx",
      key: "is_alarm_tx",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Status",
      dataIndex: "tx_status",
      key: "tx_status",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
  ];

  useEffect(() => {
    const dataSource = tableData.flatMap((record, recordIndex) =>
      record.data.map((dataItem, dataIndex) => ({
        key: `${recordIndex}-${dataIndex}`,
        timestamp: dataItem[0],
        parameters: dataItem[1],
        content: dataItem[2], // Use item.data[2] for content
        service_number: dataItem[3],
        priority: dataItem[4],
        bytes: dataItem[5],
        destination: dataItem[6],
        network_type: dataItem[7],
        is_alarm_tx: dataItem[8],
        tx_status: dataItem[9],
        reference: dataItem[10],
      }))
    );

    const filteredData = dataSource.filter((item) => {
      const timestamp = item.timestamp;
      const [startDate, endDate] = rangePickerValue;

      const timestampInSeconds =
        timestamp < 1e12 ? timestamp : Math.floor(timestamp / 1000);

      return (
        timestampInSeconds >= startDate.unix() &&
        timestampInSeconds <= endDate.unix()
      );
    });

    setApiResponseData({ data: filteredData });
  }, [tableData, rangePickerValue]);

  const totalRecords = apiResponseData.data ? apiResponseData.data.length : 0;

  return (
    <div className="contents">
      <div className="titletbl">Total Records: {totalRecords}</div>

      <div>
        <Table
          size="small"
          columns={columns}
          bordered={true}
          dataSource={apiResponseData.data}
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "")}
          scroll={{ x: 768 }}
        />
      </div>
    </div>
  );
};

TxhistoryTable.propTypes = {
  rangePickerValue: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableData: PropTypes.array.isRequired,
  selectedTerminal: PropTypes.number.isRequired,
};

export default TxhistoryTable;
