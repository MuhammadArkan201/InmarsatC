import React, { useState, useEffect } from "react";
import Popup from "../../../../Popup/Popup";
import DirectoryTable from "./DirectoryTable";
import PropTypes from "prop-types";

function DirectoryTab({ selectedTerminal, activeTab }) {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (start, end) => {
    try {
      // Fetch data from the mock API
      const response = await fetch(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/directory?dest=${selectedTerminal}&start=${start}&end=${end}`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received in DirectoryTab:", data);

      // Update state with fetched data
      setTableData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch data only if the component is still mounted
        if (isMounted && activeTab === "Directorytab") {
          await fetchData();
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    // Fetch data when conditions are met
    if (showTable && isMounted && selectedTerminal !== tableData.selectedTerminal && activeTab === "Directorytab") {
      setTableData([]);
      fetchData();
    }

    // Cleanup: set isMounted to false when the component unmounts
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
        <div className="head-content">Device Directory</div>
        {/* Render Popup component with event handlers */}
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
          // Render DirectoryTable component with data
          showTable &&
          tableData?.length > 0 && (
            <DirectoryTable
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

DirectoryTab.propTypes = {
  selectedTerminal: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default DirectoryTab;
