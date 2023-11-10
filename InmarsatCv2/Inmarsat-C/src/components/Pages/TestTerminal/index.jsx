import {Typography } from "antd";
import TabsOps from "./TabPages/TabsOps";

function TestTerminal() {
  return (
    <div className="tabs-line">
      <div>
        <Typography.Text className="Title">Test Terminal</Typography.Text>
      </div>
      <div>
        <TabsOps />
      </div>
    </div>
  );
}

export default TestTerminal;
