import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import "./CmdTab.css";
import Cmdprompt from "./Cmdprompt";
import Cmdrespond from "./Cmdrespond";

function CmdTab({ selectedTerminal }) {
  const [responseData, setResponseData] = useState(null);

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Command Prompt</div>
        <Cmdprompt
          selectedTerminal={selectedTerminal}
          setResponseData={setResponseData}
        />
      </div>

      <div className="content">
        <div className="head-content">Respond</div>
        <Cmdrespond responseData={responseData} />
      </div>
    </div>
  );
}

CmdTab.propTypes = {
  selectedTerminal: PropTypes.number,
};

export default CmdTab;
