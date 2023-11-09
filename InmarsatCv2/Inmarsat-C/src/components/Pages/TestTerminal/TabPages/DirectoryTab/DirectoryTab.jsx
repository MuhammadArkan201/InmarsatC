import { useState, useEffect } from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";
import DirectoryTable from "./DirectoryTable";

const DirectoryTab = () => {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setFilteredData] = useState([]);

  const filterData = (selectedRange) => {
    if (selectedRange.length === 2) {
      const [startTime, endTime] = selectedRange;

      // Filter the tableData based on the timestamp within the range
      const filtered = tableData.filter((item) => {
        const timestamp = item.timestamp;

        return timestamp >= startTime && timestamp <= endTime;
      });

      // Update the state with the filtered data
      setFilteredData(filtered);
    } else {
      console.error('Invalid range provided.');
    }
  };

  useEffect(() => {
    // Fetch the JSON data when the component mounts
    const fetchJsonData = async () => {
      try {
        const response = await fetch("/datas/egctabData/egctabData.json");
        const data = await response.json();
        setTableData(data.data); // Store the fetched data
        setLoading(false); // Set loading state to false once data is loaded
        filterData([]); // Initially load all data without filtering
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    return () => fetchJsonData();
  }, []);


  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
        < Popup
          onShowTable={() => setShowTable(true)}
          onRangePickerChange={(value) => setRangePickerValue(value)}
        />
      </div>
      <div className="content">
        <div className="head-content">
          Records from {rangePickerValue.join(" - ")}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          showTable && (
            <DirectoryTable rangePickerValue={rangePickerValue} tableData={tableData} />
          )
        )}
      </div>
    </div>
  );
};

export default DirectoryTab;