import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../../../App.css";
import DropdownSignal from "./DropdownSignal";
import PopupSignal from "../../../../Popup/PopupSignal";
import SignalLevel from "./SignalLevel";

function SignalTab({ selectedTerminal, activeTab }) {
  const [selectedRange, setSelectedRange] = useState(null);
  const [showSignal, setShowSignal] = useState(false);
  const [resolution, setResolution] = useState(null);

  const handleRangePickerChange = (range, resolution) => {
    setSelectedRange(range);
    setResolution(resolution);
    setShowSignal(true);
  };

  const handleResolutionChange = (resolution) => {
    // Handle resolution change if needed in the SignalTab component
    // For example, you can set it in a state if you need to use it later
    setResolution(resolution);
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Signal</div>
        <PopupSignal
          onShowSignal={() => setShowSignal(true)}
          onRangePickerChange={handleRangePickerChange}
          onResolutionChange={handleResolutionChange} 
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
