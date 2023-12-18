// TabsOps.jsx
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import StatusTab from "./StatusTab/StatusTab";
import SignalTab from "./SignalTab/SignalTab";
import EgcTab from "./EgcTab/EgcTab";
import DirectoryTab from "./DirectoryTab/DirectoryTab";
import InfoTab from "./InfoTab/InfoTab";
import TerminalLoc from "./TerminalLoc";
import TxhistoryTab from "./TxhistoryTab/TxhistoryTab";
import EmailTab from "./EmailTab/EmailTab";
import ConfigTab from "./ConfigTab/ConfigTab";

const { TabPane } = Tabs;

function TabsOps() {
  const [preferredOcean, setPreferredOcean] = useState("");
  const [signalValue, setSignalValue] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(1);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [activeTab, setActiveTab] = useState("Infotab"); // Add activeTab state

  useEffect(() => {
    const fetchData = () => {
      try {
        if (!isInitialRender && selectedTerminal !== null) {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "GET",
            `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/snr?dest=${selectedTerminal}`,
            true
          );
    
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                const jsonData = JSON.parse(xhr.responseText);
                const lastDataPoint = jsonData[0]?.data ?? null;
                const signal = lastDataPoint ? lastDataPoint.signal : null;
                setSignalValue(signal);
              } else {
                console.error(`Network response was not ok: ${xhr.status}`);
              }
            }
          };
    
          xhr.onerror = function () {
            console.error("There was an error with the XHR request");
          };
    
          xhr.send();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsInitialRender(false);
      }
    };
    

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [selectedTerminal, isInitialRender]);

  const handleTerminalSelect = (terminalId) => {
    setSelectedTerminal(terminalId);
    setActiveTab("Infotab"); // Switch to the "Info" tab when the terminal is selected
  };

  return (
    <div>
      <Tabs
        className="tabs"
        activeKey={activeTab}
        tabBarExtraContent={
          <TerminalLoc onSelectTerminal={handleTerminalSelect} />
        }
        onChange={(key) => setActiveTab(key)}
      >
        <TabPane key="Infotab" tab="Info" className="Infotab">
          <div>
            <InfoTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
            />
          </div>
        </TabPane>
        <TabPane key="Statustab" tab="Status">
          <div>
            <StatusTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
              setPreferredOcean={setPreferredOcean}
            />
          </div>
        </TabPane>
        <TabPane key="EGCtab" tab="EGC">
          <div>
            <EgcTab selectedTerminal={selectedTerminal} activeTab={activeTab} />
          </div>
        </TabPane>
        <TabPane key="Directorytab" tab="Directory">
          <div>
            <DirectoryTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
            />
          </div>
        </TabPane>
        <TabPane key="Txhistorytab" tab="Tx History">
          <div>
            <TxhistoryTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
            />
          </div>
        </TabPane>
        <TabPane key="Emailtab" tab="Email">
          <div>
            <EmailTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
              preferredOcean={preferredOcean}
            />
          </div>
        </TabPane>
        <TabPane key="Send Datatab" tab="Send Data">
          <div>tab content Send Data tab</div>
        </TabPane>
        <TabPane key="Cmdtab" tab="Cmd">
          <div>tab content Cmd tab</div>
        </TabPane>
        <TabPane key="Configtab" tab="Config">
          <div> <ConfigTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
              preferredOcean={preferredOcean}
            /></div>
        </TabPane>
        <TabPane key="Signaltab" tab={`Signal: ${signalValue}`}>
          <div>
            <SignalTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsOps;
