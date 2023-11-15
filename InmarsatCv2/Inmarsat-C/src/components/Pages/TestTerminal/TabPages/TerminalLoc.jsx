import React, { useState, useEffect } from "react";
import { Select } from "antd";

const TerminalLoc = ({ onSelectTerminal }) => {
  const [terminals, setTerminals] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchTerminalData = () => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            "https://8d296872-65ca-450a-b572-34eae6228517.mock.pstmn.io/terminal_list?type=inmarsatc",
            true
          );
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                try {
                  const response = JSON.parse(xhr.responseText);
                  if (Array.isArray(response.data)) {
                    resolve(response.data);
                  } else {
                    reject(
                      new Error("Invalid data structure in the API response")
                    );
                  }
                } catch (error) {
                  reject(new Error("Error parsing JSON in API response"));
                }
              } else {
                reject(new Error(`Network response was not ok: ${xhr.status}`));
              }
            }
          };

          xhr.onerror = function () {
            reject(new Error("There was an error with the XHR request"));
          };

          xhr.send(JSON.stringify({}));
        });
      };

      return () =>
        fetchTerminalData()
          .then((data) => {
            console.log("Terminal data:", data);
            setTerminals(data);
            setDataFetched(true); // Set the flag to true after fetching data
          })
          .catch((error) => {
            console.error("Error fetching terminal data:", error);
          });
    }
  }, []); // Dependency array includes dataFetched

  const handleChange = (value, option) => {
    console.log(`selected ${value}`);
    setSelectedTerminal(value);

    const terminalId = option?.terminal_id;
    if (terminalId) {
      onSelectTerminal(terminalId);
    }
  };

  return (
    <div>
      <Select
        value={selectedTerminal}
        style={{ width: 120 }}
        onChange={handleChange}
        options={terminals.map((terminal) => ({
          value: terminal.terminal_id,
          label: terminal.terminal_location,
          terminal_id: terminal.terminal_id,
        }))}
      />
    </div>
  );
};

export default TerminalLoc;
