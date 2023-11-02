import { Tabs } from "antd";
import { useState, useEffect } from "react";
import InfoTab from "./InfoTab/InfoTab";
import StatusTab from "./StatusTab/StatusTab";
import SignalTab from "./SignalTab/SignalTab";
import EgcTab from "./EgcTab/EgcTab";
import DirectoryTab from "./DirectoryTab/DirectoryTab";
const { TabPane } = Tabs;

function TabsOps() {
  const [signalValue, setSignalValue] = useState(null);

  useEffect(() => {
    const fetchSignalData = async () => {
      try {
        const response = await fetch("/datas/signaltabData/signaltabData.json");
        const jsonData = await response.json();
        const signal = jsonData.data.signal;
        setSignalValue(signal);
      } catch (error) {
        console.error("Error fetching signal data:", error);
      }
    };

    fetchSignalData();
  }, []);

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
          <div>
            <DirectoryTab />
          </div>
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
        <TabPane tab={`Signal: ${signalValue}`} key="Signaltab">
          <div>
            <SignalTab />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsOps;
