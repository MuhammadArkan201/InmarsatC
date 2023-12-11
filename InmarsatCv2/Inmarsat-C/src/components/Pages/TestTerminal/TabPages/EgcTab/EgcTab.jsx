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

    const fetchData = async (start, end) => {
      try {
        if (activeTab === "EGCtab") {
          const data = await fetchDataXHR(start, end);

          if (isMounted) {
            setTableData(data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    if (
      showTable &&
      isMounted &&
      selectedTerminal !== tableData.selectedTerminal &&
      activeTab === "EGCtab"
    ) {
      setTableData([]);
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [showTable, selectedTerminal, activeTab, rangePickerValue]);

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };

  const handleDataFetch = async (dateValue) => {
    const startDate = dateValue[0] ? Math.floor(dateValue[0].unix()) : "";
    const endDate = dateValue[1] ? Math.floor(dateValue[1].unix()) : "";

    console.log("Start Date (Epoch):", startDate);
    console.log("End Date (Epoch):", endDate);

    await fetchData(startDate, endDate);
  };

  const handlePopupSubmit = async () => {
    if (rangePickerValue.length === 2) {
      setShowTable(true);
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
          onDataFetch={handleDataFetch}
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
