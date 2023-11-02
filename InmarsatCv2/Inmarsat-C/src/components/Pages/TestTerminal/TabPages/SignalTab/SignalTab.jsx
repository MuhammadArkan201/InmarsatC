import "../../../../../App.css";

import DropdownSignal from "./DropdownSignal";
import PopupSignal from "../../../../Popup/PopupSignal";
import SignalLevel from "./SignalLevel";
import { Space } from "antd";

function SignalTab() {
  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Device Signal</div>
        <PopupSignal />
      </div>
      <div className="content">
        <div className="head-content">
          <DropdownSignal />
        </div>
        <div>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {" "}
            <SignalLevel />{" "}
          </Space>
        </div>{" "}
      </div>
    </div>
  );
}

export default SignalTab;
