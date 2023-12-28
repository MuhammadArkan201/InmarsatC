import React, { useState } from 'react';
import Senddataform from './Senddataform';
import PropTypes from 'prop-types';
import axios from 'axios';

function SenddataTab({ selectedTerminal, activeTab }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitFormWithAxios = async (formData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/tx?dest=${selectedTerminal}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error.message);
      setErrorMessage('Error sending data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">Send Email</div>
        <div>
          <Senddataform
            activeTab={activeTab}
            selectedTerminal={selectedTerminal}
            submitFormWithAxios={submitFormWithAxios}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

SenddataTab.propTypes = {
  selectedTerminal: PropTypes.number,
  activeTab: PropTypes.string,
};

export default SenddataTab;