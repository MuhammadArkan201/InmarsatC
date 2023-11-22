import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import StatusTab from "./StatusTab/StatusTab";
import SignalTab from "./SignalTab/SignalTab";
import EgcTab from "./EgcTab/EgcTab";
import DirectoryTab from "./DirectoryTab/DirectoryTab";
import InfoTab from "./InfoTab/InfoTab";
import TerminalLoc from "./TerminalLoc";

const { TabPane } = Tabs;

function TabsOps() {
  const [signalValue, setSignalValue] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(1);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        if (!isInitialRender && selectedTerminal !== null) {
          // setLoading(true); // Assuming you have setLoading in your code, uncomment this line if needed

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
                const signal = jsonData[0]?.data?.signal ?? null;
                setSignalValue(signal);
              } else {
                console.error(`Network response was not ok: ${xhr.status}`);
              }
              // setLoading(false); // Assuming you have setLoading in your code, uncomment this line if needed
            }
          };

          xhr.onerror = function () {
            console.error("There was an error with the XHR request");
            // setLoading(false); // Assuming you have setLoading in your code, uncomment this line if needed
          };

          xhr.send();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsInitialRender(false);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 minutes
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [selectedTerminal, isInitialRender]);

  const handleTerminalSelect = (terminalId) => {
    setSelectedTerminal(terminalId);
  };

  return (
    <div>
      <Tabs
        className="tabs"
        tabBarExtraContent={
          <TerminalLoc onSelectTerminal={handleTerminalSelect} />
        }
      >
        <TabPane key="Infotab" tab="Info" className="Infotab">
          <div>
            <InfoTab selectedTerminal={selectedTerminal} />
          </div>
        </TabPane>
        <TabPane key="Statustab" tab="Status">
          <div>
            <StatusTab  />
          </div>
        </TabPane>
        <TabPane key="EGCtab" tab="EGC">
          <div>
            <EgcTab />
          </div>
        </TabPane>
        <TabPane key="Directorytab" tab="Directory">
          <div>
            <DirectoryTab  />
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
            <SignalTab selectedTerminal= {selectedTerminal}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsOps;
