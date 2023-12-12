import React, { useState, useEffect } from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";
import EgcTable from "./EgcTable";
import PropTypes from "prop-types";

function EgcTab({ selectedTerminal, activeTab }) {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataXHR = (start, end) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/egc?dest=${selectedTerminal}&start=${start}&end=${end}`;

      xhr.open("GET", url, true);

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          console.log("Data received in EgcTab:", data);
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
      if (activeTab !== "EGCtab" || selectedTerminal === null) {
        return Promise.resolve(null);
      }

      return new Promise(async (resolve, reject) => {
        const startDate = rangePickerValue[0] ? Math.floor(rangePickerValue[0].valueOf() / 1000) : '';
        const endDate = rangePickerValue[1] ? Math.floor(rangePickerValue[1].valueOf() / 1000) : '';

        try {
          const data = await fetchDataXHR(startDate, endDate);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    };

    const fetchData = async () => {
      if (showTable && activeTab === "EGCtab") {
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

    if (isMounted && showTable && activeTab === "EGCtab") {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [showTable, activeTab, rangePickerValue, selectedTerminal]);

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };

  const handleDataFetch = async (dateValue) => {
    const startDate = dateValue[0] ? dateValue[0].valueOf() : 0;
    const endDate = dateValue[1] ? dateValue[1].valueOf() : 0;

    console.log("Start Date (Type):", typeof dateValue[0], "Value:", dateValue[0]);
    console.log("End Date (Type):", typeof dateValue[1], "Value:", dateValue[1]);
    console.log("Start Date (Epoch):", startDate);
    console.log("End Date (Epoch):", endDate);

    try {
      const data = await fetchDataXHR(startDate, endDate);
      setTableData(data);
      setLoading(false);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePopupSubmit = async () => {
    if (rangePickerValue.length === 2) {
      await handleDataFetch(rangePickerValue);
    } else {
      console.error("Invalid rangePickerValue:", rangePickerValue);
    }
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
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
            <EgcTable
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

EgcTab.propTypes = {
  selectedTerminal: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default EgcTab;
