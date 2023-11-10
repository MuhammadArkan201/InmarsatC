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

    const fetchData = async () => {
      try {
        const response = await fetch("/datas/egctabData/egctabData.json");
        const data = await response.json();
        if (isMounted) {
          setTableData(data.data); // Store the fetched data
          setLoading(false); // Set loading state to false once data is loaded
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    if (showTable && isMounted && tableData.length === 0) {
      fetchData(); // Fetch data only when showTable becomes true and tableData is empty
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
          showTable && tableData.length > 0 && (
            <EgcTable rangePickerValue={rangePickerValue} tableData={tableData} />
          )
        )}
      </div>
    </div>
  );
};

export default EgcTab;
