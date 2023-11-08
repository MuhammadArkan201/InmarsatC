import React from "react";
import "../../../../../App.css";
import PopupSignal from "../../../../Popup/PopupSignal";

function DirectoryTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Directory</div>
        <PopupSignal/>
      </div>
      <div className="content">
        <div className="head-content">Records</div>
        <div></div>
      </div>
    </div>
  );
}

export default DirectoryTab;
