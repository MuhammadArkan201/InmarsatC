import React from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";

function DirectoryTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Directory</div>
        <Popup/>
      </div>
      <div className="content">
        <div className="head-content">Records</div>
        <div></div>
      </div>
    </div>
  );
}

export default DirectoryTab;
