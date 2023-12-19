import React, { useState, useEffect } from 'react';

function CmdTab() {
  const [data, setData] = useState([]);
  const [resolution, setResolution] = useState(1); // Default resolution is set to 1 second

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://655c2821ab37729791a9ef77.mockapi.io/api/v1/historical_snr?dest=1');
        const result = await response.json();

        // Filter data based on the selected resolution
        const filteredData = result[0].data.filter(([timestamp, _]) => timestamp % resolution === 0);

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [resolution]); // Include resolution in the dependency array

  return (
    <div>
      <h2>Data from API (filtered for {resolution}-second resolution):</h2>
      <label>
        Select Resolution:
        <select
          value={resolution}
          onChange={(e) => setResolution(Number(e.target.value))}
        >
          <option value={1}>1 second</option>
          <option value={5}>5 seconds</option>
          <option value={10}>10 seconds</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <ul>
        {data.map(([timestamp, value]) => (
          <li key={timestamp}>
            <p>Epoch Timestamp: {timestamp}</p>
            <p>Value: {value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CmdTab;
