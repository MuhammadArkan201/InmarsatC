import { useState, useEffect } from "react";
import { Table } from "antd";
import "./directoryTable.css";
import moment from "moment";
import PropTypes from "prop-types";

const DirectoryTable = ({ rangePickerValue, tableData }) => {
  const [apiResponseData, setApiResponseData] = useState({ data: [] });

  const convertTimestamp = (epochTime) => {
    return moment.unix(epochTime).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
      render: (data) => (
        <div className="pre-wrapper">
          <pre className="content-pre">{data}</pre>
        </div>
      ),
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
      render: (data) => <pre className="content-pre">{data}</pre>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (data) => <pre className="content-pre-content">{data}</pre>,
    },
  ];

  useEffect(() => {
    const dataSource = tableData.map((item, index) => ({
      key: index,
      filename: item.data[0],
      timestamp: item.data[1],
      bytes: item.data[2],
      content: item.data[3].replace(/\n/g, " "), // Replace newline with space
    }));

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

DirectoryTable.propTypes = {
  rangePickerValue: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableData: PropTypes.array.isRequired,
  selectedTerminal: PropTypes.number.isRequired,
};

export default DirectoryTable;
