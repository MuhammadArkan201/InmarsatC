import React, { useState } from "react";
import "../../../../../App.css";
import PropTypes from "prop-types";

import DropdownSignal from "./DropdownSignal";
import PopupSignal from "../../../../Popup/PopupSignal";
import SignalLevel from "./SignalLevel";

function SignalTab({ selectedTerminal }) {
  const [selectedRange, setSelectedRange] = useState(null);
  const [showSignal, setShowSignal] = useState(false);

  const handleRangePickerChange = (range) => {
    setSelectedRange(range);
    setShowSignal(true);
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Signal</div>
        <PopupSignal
          onShowSignal={() => setShowSignal(true)}
          onRangePickerChange={handleRangePickerChange}
        />
      </div>
      {showSignal && selectedRange && (
        <div className="content">
          <div className="head-content">
            <DropdownSignal />
          </div>
          <div>
            <SignalLevel
              selectedRange={selectedRange}
              selectedTerminal={selectedTerminal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

SignalTab.propTypes = {
  selectedRange: PropTypes.array,
  selectedTerminal: PropTypes.number,
};

export default SignalTab;
