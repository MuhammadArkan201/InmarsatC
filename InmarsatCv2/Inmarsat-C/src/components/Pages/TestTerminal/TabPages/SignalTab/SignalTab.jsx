import React, { useState } from "react";
import "../../../../../App.css";

import DropdownSignal from "./DropdownSignal";
import PopupSignal from "../../../../Popup/PopupSignal";
import SignalLevel from "./SignalLevel";

function SignalTab() {
  const [selectedRange, setSelectedRange] = useState(null);

  const handleRangePickerChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Signal</div>
        <PopupSignal onRangePickerChange={handleRangePickerChange} />
      </div>
      <div className="content">
        <div className="head-content">
          <DropdownSignal />
        </div>
        <div>
          <SignalLevel selectedRange={selectedRange} />
        </div>
      </div>
    </div>
  );
}

export default SignalTab;
