import React, { useState } from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";
import EgcTable from "./EgcTable";

function EgcTab() {
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = () => {
    setShowTable(true);
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
        <Popup onShowTable={handleShowTable} />
      </div>
      <div className="content">
        <div className="head-content">Records</div>
        {showTable && <EgcTable />}
      </div>
    </div>
  );
}
export default EgcTab;
