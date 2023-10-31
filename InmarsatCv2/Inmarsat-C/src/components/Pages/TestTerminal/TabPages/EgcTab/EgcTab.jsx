import React from "react";
import "../../../../../App.css";
import DatePickerPopup from "../../../../Popup/DatePickerPopup";
import EgcTable from "./EgcTable";

function EgcTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
        <DatePickerPopup />
      </div>
      <div className="content">
        <div className="head-content">Records</div>
        <div>
          <EgcTable></EgcTable>
        </div>
      </div>
    </div>
  );
}
export default EgcTab;
