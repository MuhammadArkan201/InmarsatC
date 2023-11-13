import React, { useState } from "react";
import "../../../../../App.css";

import DropdownSignal from "./DropdownSignal";
import PopupSignal from "../../../../Popup/PopupSignal";
import SignalLevel from "./SignalLevel";

function SignalTab() {
  const [selectedRange, setSelectedRange] = useState(null);
  const [showSignal, setShowSignal] = useState(false); // New state to control SignalLevel visibility

  const handleRangePickerChange = (range) => {
    setSelectedRange(range);
    setShowSignal(true); // Show SignalLevel when range is selected
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Signal</div>
        <PopupSignal onShowSignal={() => setShowSignal(true)} onRangePickerChange={handleRangePickerChange} />
      </div>
      {showSignal && selectedRange && ( // Conditionally render SignalLevel
        <div className="content">
          <div className="head-content">
            <DropdownSignal />
          </div>
          <div>
            <SignalLevel selectedRange={selectedRange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignalTab;