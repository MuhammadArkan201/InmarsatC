import React from 'react'
import Emailform from './Emailform'
import PropTypes from "prop-types";

function EmailTab({ preferredOcean, selectedTerminal }) {
  return (
    <div className="contents">
        <div className="content">
            <div className="head-content">Send Email</div>
            <div><Emailform preferredOcean={preferredOcean} selectedTerminal={selectedTerminal} /></div>
        </div>
    </div>
  )
}

EmailTab.propTypes = {
  preferredOcean: PropTypes.string, // Add this line
  selectedTerminal: PropTypes.number,
};

export default EmailTab
