import React, { useState, useEffect } from "react";
import Popup from "../../../../Popup/Popup";
import TxhistoryTable from "./TxhistoryTable";
import PropTypes from "prop-types";

function TxhistoryTab({ selectedTerminal, activeTab }) {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataXHR = (start, end) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/txlog?dest=${selectedTerminal}&start=${start}&end=${end}`;

      xhr.open("GET", url, true);

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          console.log("Data received in TxhistoryTab:", data);
          resolve(data);
        } else {
          reject(new Error(`XHR request failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = function () {
        reject(new Error("XHR request failed"));
      };

      xhr.send();
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchJsonData = async () => {
      if (activeTab !== "Txhistorytab" || selectedTerminal === null) {
        return Promise.resolve(null);
      }

      return new Promise(async (resolve, reject) => {
        const startDate = rangePickerValue[0]
          ? Math.floor(rangePickerValue[0].unix())
          : "";
        const endDate = rangePickerValue[1]
          ? Math.floor(rangePickerValue[1].unix())
          : "";

        try {
          const data = await fetchDataXHR(startDate, endDate);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    };

    const fetchData = async () => {
      if (showTable && activeTab === "Txhistorytab") {
        setTableData([]);
        setLoading(true);

        try {
          const postData = await fetchJsonData();
          setTableData(postData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isMounted && showTable && activeTab === "Txhistorytab") {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [showTable, activeTab, rangePickerValue, selectedTerminal]);

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };

  const handleDataFetch = async () => {
    try {
      await fetchDataXHR();
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePopupSubmit = async () => {
    if (rangePickerValue.length === 2) {
      await handleDataFetch();
    } else {
      console.error("Invalid rangePickerValue:", rangePickerValue);
    }
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Txhistory</div>
        <Popup
          onShowTable={() => setShowTable(true)}
          onRangePickerChange={handleRangePickerChange}
          onSubmit={handlePopupSubmit}
        />
      </div>
      <div className="content">
        <div className="head-content">Records</div>
        {loading ? (
          <p>Please select the date</p>
        ) : (
          showTable &&
          tableData?.length > 0 && (
            <TxhistoryTable
              rangePickerValue={rangePickerValue}
              tableData={tableData}
              selectedTerminal={selectedTerminal}
            />
          )
        )}
      </div>
    </div>
  );
}

TxhistoryTab.propTypes = {
  selectedTerminal: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default TxhistoryTab;
