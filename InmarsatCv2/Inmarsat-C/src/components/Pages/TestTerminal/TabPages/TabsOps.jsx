import { useState, useEffect } from "react";
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
  const [selectedTerminal, setSelectedTerminal] = useState(1);

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
        <TabPane key="Infotab" tab="Info" className="Infotab">
          <div>
            <InfoTab selectedTerminal={selectedTerminal} />
          </div>
        </TabPane>
        <TabPane key="Statustab" tab="Status">
          <div>
            <StatusTab selectedTerminal={selectedTerminal} />
          </div>
        </TabPane>
        <TabPane key="EGCtab" tab="EGC">
          <div>
            <EgcTab />
          </div>
        </TabPane>
        <TabPane key="Directorytab" tab="Directory">
          <div>
            <DirectoryTab />
          </div>
        </TabPane>
        <TabPane key="Tx Historytab" tab="Tx History">
          <div>tab content Tx History tab</div>
        </TabPane>
        <TabPane key="Emailtab" tab="Email">
          <div>tab content Email tab</div>
        </TabPane>
        <TabPane key="Send Datatab" tab="Send Data">
          <div>tab content Send Data tab</div>
        </TabPane>
        <TabPane key="Cmdtab" tab="Cmd">
          <div>tab content Cmd tab</div>
        </TabPane>
        <TabPane key="Configtab" tab="Config">
          <div>tab content Config tab</div>
        </TabPane>
        <TabPane key="Signaltab" tab={`Signal: ${signalValue}`}>
          <div>
            <SignalTab />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsOps;
