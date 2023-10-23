import { Tabs } from "antd";
import InfoTab from "./InfoTab/InfoTab";
import StatusTab from "./StatusTab/StatusTab";
import SignalTab from "./SignalTab/SignalTab";
import EgcTab from "./EgcTab/EgcTab";
const { TabPane } = Tabs;

function TabsOps() {
  return (
    <div>
      <Tabs className="tabs">
        <TabPane tab="Info" key="Infotab" className="Infotab">
          <div>
            <InfoTab />
          </div>
        </TabPane>
        <TabPane tab="Status" key="Statustab">
          <div>
            <StatusTab />
          </div>
        </TabPane>
        <TabPane tab="EGC" key="EGCtab">
          <div>
            <EgcTab />
          </div>
        </TabPane>
        <TabPane tab="Directory" key="Directorytab">
          <div>tab content Directory tab</div>
        </TabPane>
        <TabPane tab="Tx History" key="Tx Historytab">
          <div>tab content Tx History tab</div>
        </TabPane>
        <TabPane tab="Email" key="Emailtab">
          <div>tab content Email tab</div>
        </TabPane>
        <TabPane tab="Send Data" key="Send Datatab">
          <div>tab content Send Data tab</div>
        </TabPane>
        <TabPane tab="Cmd" key="Cmdtab">
          <div>tab content Cmd tab</div>
        </TabPane>
        <TabPane tab="Config" key="Configtab">
          <div>tab content Config tab</div>
        </TabPane>
        <TabPane tab="Signal" key="Signaltab">
          <div>
            <SignalTab />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsOps;
