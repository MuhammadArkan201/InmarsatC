import React from "react";
import "../../../../../App.css";
import Popup from "../../../../Popup/Popup";
import EgcTable from "./EgcTable";

function EgcTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
        <Popup />
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
