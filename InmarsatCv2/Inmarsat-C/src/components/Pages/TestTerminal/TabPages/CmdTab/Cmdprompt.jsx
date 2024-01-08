import React, { useState } from "react";
import { Button, Select } from "antd";
import PropTypes from "prop-types";
import "./CmdTab.css";

function Cmdprompt({ selectedTerminal, setResponseData }) {
  const [selectedCommand, setSelectedCommand] = useState("");

  const onFinish = (values) => {
    console.log("Received values:", values);

    if (selectedCommand) {
      fetch(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/command2?dest=${selectedTerminal}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cmd: selectedCommand }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setResponseData(data); // Pass data to parent component
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <Select
        className="prompt"
        showSearch
        style={{
          width: 227,
          height: 48,
        }}
        placeholder="Type or select any command here"
        onChange={(value) => setSelectedCommand(value)}
        options={[
          {
            value: "status -t",
            label: "status -t | Status",
          },
          {
            value: "2",
            label: "help | Command Help",
          },
          {
            value: "errorlog",
            label: "errorlog |Show Error Log",
          },
          {
            value: "clear",
            label: "clear | Abort Current Operation",
          },
          {
            value: "reboot 42",
            label: "reboot 42 |Reboot of the Terminal",
          },
        ]}
      />

      <Button className="btn" onClick={onFinish}>
        Send
      </Button>
    </>
  );
}

Cmdprompt.propTypes = {
  selectedTerminal: PropTypes.number,
  setResponseData: PropTypes.func.isRequired,
};

export default Cmdprompt;
