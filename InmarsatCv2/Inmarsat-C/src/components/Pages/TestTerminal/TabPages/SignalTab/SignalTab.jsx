import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../../../App.css";
import DropdownSignal from "./DropdownSignal";
import PopupSignal from "../../../../Popup/PopupSignal";
import SignalLevel from "./SignalLevel";

function SignalTab({ selectedTerminal, activeTab }) {
  const [selectedRange, setSelectedRange] = useState(null);
  const [showSignal, setShowSignal] = useState(false);
  const [resolution, setResolution] = useState(null); // Add resolution state

  const handleRangePickerChange = (range, resolution) => {
    setSelectedRange(range);
    setResolution(resolution); // Set the resolution parameter
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
              activeTab={activeTab}
              resolution={resolution}
            />
          </div>
        </div>
      )}
    </div>
  );
}

SignalTab.propTypes = {
  selectedTerminal: PropTypes.number,
  activeTab: PropTypes.string,
};

export default SignalTab;