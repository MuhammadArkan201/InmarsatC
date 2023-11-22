import React, { useState, useEffect } from "react";
import { Select } from "antd";
import PropTypes from "prop-types";

const TerminalLoc = ({ onSelectTerminal }) => {
  const [terminals, setTerminals] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState("Batam");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchTerminalData = () => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "GET",
            "https://655c2821ab37729791a9ef77.mockapi.io/api/v1/terminal_list?type=inmarsatc",
            true
          );

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                setTerminals(data[0].data);
                setDataFetched(true);
                resolve(data);
              } else {
                reject(new Error(`Request failed with status: ${xhr.status}`));
              }
            }
          };

          xhr.onerror = function () {
            reject(new Error("There was a network error"));
          };

          xhr.send();
        });
      };

      return()=>fetchTerminalData().catch((error) => {
        console.error("Error fetching terminal data:", error);
      });
    }
  }, []);

  const handleTerminalChange = (value) => {
    setSelectedTerminal(value);
    const selectedTerminalObject = terminals.find(
      (terminal) => terminal.terminal_location === value
    );
    if (selectedTerminalObject) {
      onSelectTerminal(selectedTerminalObject.terminal_id);
    }
  };

  return (
    <Select
      value={selectedTerminal}
      style={{ width: 120 }}
      onChange={handleTerminalChange}
      options={terminals.map((terminal) => ({
        value: terminal.terminal_location,
        label: terminal.terminal_location,
        key: terminal.terminal_id,
      }))}
    />
  );
};

TerminalLoc.propTypes = {
  onSelectTerminal: PropTypes.func.isRequired,
};

export default TerminalLoc;
