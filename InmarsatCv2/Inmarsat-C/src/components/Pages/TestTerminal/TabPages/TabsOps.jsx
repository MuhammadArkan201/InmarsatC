// TabsOps.jsx
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import StatusTab from "./StatusTab/StatusTab";
import SignalTab from "./SignalTab/SignalTab";
import EgcTab from "./EgcTab/EgcTab";
import DirectoryTab from "./DirectoryTab/DirectoryTab";
import InfoTab from './InfoTab/InfoTab';
import TerminalLoc from './TerminalLoc';

const { TabPane } = Tabs;

function TabsOps() {
  const [signalValue, setSignalValue] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(null);

  useEffect(() => {
    const fetchSignalData = () => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(
          'POST',  // Change the method to POST
          '/datas/signaltabData/signaltabData.json',
          true
        );
  
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const jsonData = JSON.parse(xhr.responseText);
              const signal = jsonData.data.signal;
              resolve(signal);
            } else {
              reject(new Error(`Network response was not ok: ${xhr.status}`));
            }
          }
        };
  
        xhr.onerror = function () {
          reject(new Error('There was an error with the XHR request'));
        };
  
        xhr.send();
      });
    };
  
    return () =>
      fetchSignalData()
        .then((signal) => {
          setSignalValue(signal);
        })
        .catch((error) => {
          console.error('Error fetching signal data:', error);
        });
  }, []);  

  const handleTerminalSelect = (terminalId) => {
    setSelectedTerminal(terminalId);
  };

  return (
    <div>
      <Tabs className="tabs" tabBarExtraContent={<TerminalLoc onSelectTerminal={handleTerminalSelect} />}>
        <TabPane tab="Info" key="Infotab" className="Infotab">
          <div>
            <InfoTab selectedTerminal={selectedTerminal} />
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
