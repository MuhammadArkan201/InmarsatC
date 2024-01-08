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
import SenddataTab from "./SenddataTab/SenddataTab";
import CmdTab from "./CmdTab/CmdTab";

const { TabPane } = Tabs;

function TabsOps() {
  const [preferredOcean, setPreferredOcean] = useState("");
  const [signalValue, setSignalValue] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(1);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [activeTab, setActiveTab] = useState("Infotab");
  const [signalReadInterval, setSignalReadInterval] = useState(60 * 60 * 300);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isInitialRender && selectedTerminal !== null) {
          // Fetch signal data
          const signalXhr = new XMLHttpRequest();
          signalXhr.open(
            "GET",
            `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/snr?dest=${selectedTerminal}`,
            true
          );

          signalXhr.onreadystatechange = function () {
            if (signalXhr.readyState === 4) {
              if (signalXhr.status === 200) {
                const jsonData = JSON.parse(signalXhr.responseText);
                const lastDataPoint = jsonData[0]?.data ?? null;
                const signal = lastDataPoint ? lastDataPoint.signal : null;
                setSignalValue(signal);
              } else {
                console.error(
                  `Signal: Network response was not ok: ${signalXhr.status}`
                );
              }
            }
          };

          signalXhr.onerror = function () {
            console.error("Signal: There was an error with the XHR request");
          };

          signalXhr.send();

          // Fetch config data
          const configXhr = new XMLHttpRequest();
          configXhr.open(
            "GET",
            `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/config?dest=${selectedTerminal}`,
            true
          );

          configXhr.onreadystatechange = function () {
            if (configXhr.readyState === 4) {
              if (configXhr.status === 200) {
                const configData = JSON.parse(configXhr.responseText);
                const newSignalReadInterval =
                  configData.signal_read_interval || 60 * 60 * 300;
                setSignalReadInterval(newSignalReadInterval);

                // Update the interval with the new value
                clearInterval(intervalId);
                const newIntervalId = setInterval(() => {
                  fetchData();
                }, newSignalReadInterval);
                console.log("signal_read_interval:", newSignalReadInterval); // Log the new signal_read_interval
                setIntervalId(newIntervalId); // store the interval ID
              } else {
                console.error(
                  `Config: Network response was not ok: ${configXhr.status}`
                );
              }
            }
          };

          configXhr.onerror = function () {
            console.error("Config: There was an error with the XHR request");
          };

          configXhr.send();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsInitialRender(false);
      }
    };

    fetchData();

    const initialIntervalId = setInterval(() => {
      fetchData();
    }, signalReadInterval);

    return () => clearInterval(initialIntervalId);
  }, [selectedTerminal, isInitialRender]);

  const handleTerminalSelect = (terminalId) => {
    setSelectedTerminal(terminalId);
    setActiveTab("Infotab");
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
            />
          </div>
        </TabPane>
        <TabPane key="SendDatatab" tab="Send Data">
          <div>
            <SenddataTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
              preferredOcean={preferredOcean}
            />
          </div>
        </TabPane>
        <TabPane key="Cmdtab" tab="Cmd">
          <div>
            <CmdTab selectedTerminal={selectedTerminal} />
          </div>
        </TabPane>
        <TabPane key="Configtab" tab="Config">
          <div>
            {" "}
            <ConfigTab
              selectedTerminal={selectedTerminal}
              activeTab={activeTab}
              preferredOcean={preferredOcean}
            />
          </div>
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
