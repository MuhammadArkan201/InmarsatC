import React from "react";
import PropTypes from "prop-types";
import "./CmdTab.css";

function Cmdrespond({ responseData }) {
  const formattedData = responseData
    ? responseData.data.replace(/\r\n/g, '\n').replace(/\r/g, '')
    : '';

  // Split the text by '\n' and render each part in a separate <div>
  const lines = formattedData.split(/\r?\n/);

  return (
    <div className="respond">
      {lines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}

Cmdrespond.propTypes = {
  responseData: PropTypes.string,
};

export default Cmdrespond;
