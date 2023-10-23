import "../../../../../App.css";

import DropdownSignal from "./DropdownSignal";
import DatePickerPopup from "../../../../Popup/DatePickerPopup";
import SignalLevel from "./SignalLevel";

function SignalTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Signal</div>
        <DatePickerPopup />
      </div>
      <div className="content">
        <div className="head-content">
          <DropdownSignal />
        </div>
        <div>
          <SignalLevel />
        </div>{" "}
      </div>
    </div>
  );
}

export default SignalTab;
