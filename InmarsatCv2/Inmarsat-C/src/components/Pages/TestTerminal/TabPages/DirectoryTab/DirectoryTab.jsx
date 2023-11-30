// egctab.jsx
import React, { useState, useEffect } from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";
import DirectoryTab from "./DirectoryTab";
import PropTypes from "prop-types";

function EgcTab({ selectedTerminal }) {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/egc?dest=${selectedTerminal}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received in EgcTab:", data);

        if (isMounted) {
          setTableData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    if (showTable && isMounted && tableData.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [showTable, selectedTerminal, tableData.length]);

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
        <Popup
          onShowTable={() => setShowTable(true)}
          onRangePickerChange={(value) => setRangePickerValue(value)}
        />
      </div>
      <div className="content">
        <div className="head-content">Records</div>
        {loading ? (
          <p>Please select the date</p>
        ) : (
          showTable &&
          tableData?.length > 0 && (
            <DirectoryTab
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

EgcTab.propTypes = { selectedTerminal: PropTypes.number.isRequired };

export default EgcTab;

