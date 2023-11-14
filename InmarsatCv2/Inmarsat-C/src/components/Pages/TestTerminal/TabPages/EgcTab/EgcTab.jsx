import { useState, useEffect } from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";
import EgcTable from "./EgcTable";

const EgcTab = () => {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on an unmounted component

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/datas/egctabData/egctabData.json", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              resolve(data.data);
            } else {
              reject(new Error(`Network response was not ok: ${xhr.status}`));
            }
          }
        };

        xhr.onerror = function () {
          reject(new Error("There was an error with the XHR request"));
        };

        // Replace the following line with your actual payload
        const payload = JSON.stringify({ key: "value" });

        xhr.send(payload);
      });
    };

    if (showTable && isMounted && tableData.length === 0) {
      fetchData()
        .then((data) => {
          if (isMounted) {
            setTableData(data); // Store the fetched data
            setLoading(false); // Set loading state to false once data is loaded
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
    }

    return () => {
      isMounted = false; // Set the isMounted flag to false on unmount
    };
  }, [showTable]); // Run when showTable changes

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
        <div className="head-content">
          Records from {rangePickerValue.join(" ,until ")}
        </div>
        {loading ? (
          <p>Please select the date</p>
        ) : (
          showTable &&
          tableData.length > 0 && (
            <EgcTable
              rangePickerValue={rangePickerValue}
              tableData={tableData}
            />
          )
        )}
      </div>
    </div>
  );
};

export default EgcTab;
