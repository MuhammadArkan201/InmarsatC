import "../../../../../App.css";
import { useState } from "react";
import DatePickerPopup from "../../../../Popup/DatePickerPopup";


function EgcTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
        <DatePickerPopup />
      </div>
      <div className="content">
        <div className="head-content"></div>
        <div></div>
      </div>
    </div>
  );
}

export default EgcTab;
