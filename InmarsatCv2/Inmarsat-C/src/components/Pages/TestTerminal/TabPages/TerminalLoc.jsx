import { useState, useEffect } from "react";
import { Select } from "antd";
import PropTypes from "prop-types";

const TerminalLoc = ({ onSelectTerminal }) => {
  const [terminals, setTerminals] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState("Batam");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchTerminalData = async () => {
        try {
          const response = await fetch(
            "https://5058acfc-6112-4c38-9269-ec42d60e35bc.mock.pstmn.io/terminal_list?type=inmarsatc",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            }
          );

          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }

          const data = await response.json();
          if (Array.isArray(data.data)) {
            setTerminals(data.data);
            setDataFetched(true); // Set the flag to true after fetching data
          } else {
            throw new Error("Invalid data structure in the API response");
          }
        } catch (error) {
          console.error("Error fetching terminal data:", error);
        }
      };

      return () => fetchTerminalData();
    }
  }, []);

  const handleChange = (value, option) => {
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

TerminalLoc.propTypes = {
  onSelectTerminal: PropTypes.func.isRequired,
};

export default TerminalLoc;
