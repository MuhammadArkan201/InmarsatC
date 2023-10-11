import { Tabs, Typography, Select } from "antd";
import InfoTab from "./TabPages/InfoTab";
import TabsOps from "./TabPages/TabsOps";
import TerminalLoc from "./TabPages/TerminalLoc";




function TestTerminal() {
  return (
    <div className="tabs-line">
      <div>
        <Typography.Text className="Title">Test Terminal</Typography.Text>
        <TerminalLoc/>
  
        
      </div>
      <div>
        <TabsOps />
      </div>
      
    </div>
  );
}

export default TestTerminal;
