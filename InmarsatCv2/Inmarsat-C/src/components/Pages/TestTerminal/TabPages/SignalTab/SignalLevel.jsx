import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
import "./SignalLevel.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import "../../../../../App.css";

function SignalLevel({ selectedRange, selectedTerminal }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const fetchJsonData = () => {
    if (selectedTerminal === null) {
      setErrorMessage("Please select a terminal site");
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/snr?dest=${selectedTerminal}`,
        true
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } else {
            reject(new Error(`Network response was not ok: ${xhr.status}`));
          }
        }
      };

      xhr.onerror = function () {
        reject(new Error("There was an error with the XHR request"));
      };

      xhr.send();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isInitialRender && selectedTerminal !== null) {
        setLoading(true);

        try {
          const postData = await fetchJsonData();
          setJsonData(postData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }

      setIsInitialRender(false);
    };

    fetchData();
  }, [selectedRange, selectedTerminal, isInitialRender]);

  if (
    selectedRange &&
    selectedRange.length === 2 &&
    selectedRange[0] &&
    selectedRange[1] &&
    jsonData &&
    jsonData.length > 0
  ) {
    const [startDate, endDate] = selectedRange;
    const startTimestamp = startDate.unix();
    const endTimestamp = endDate.unix();

    // Filter data based on the selected date range
    const filteredData = jsonData.find(
      (item) => item.data.ts >= startTimestamp && item.data.ts <= endTimestamp
    );

    if (filteredData) {
      const epochTimestamp = filteredData.data.ts;
      const date = new Date(epochTimestamp * 1000);
      const optionsDate = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formattedDate = date.toLocaleDateString("en-US", optionsDate);

      const data = {
        labels: Array(6).fill(formattedDate),
        datasets: [
          {
            label: "Signal Strength",
            data: Array(6).fill(filteredData.data.signal),
            backgroundColor: "#46B39E",
            stack: "stack1",
            barPercentage: 1,
            categoryPercentage: 1,
          },
        ],
      };

      const options = {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            categorySpacing: 0,
          },
          y: {
            beginAtZero: true,
            min: 1,
            max: 6,
            ticks: {
              stepSize: 1,
            },
          },
        },
        indexAxis: "x",
        responsive: true,
      };

      return (
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      );
    }
  }

  return null; // Return null if selectedRange is not valid or no matching data
}

SignalLevel.propTypes = {
  selectedRange: PropTypes.array,
  selectedTerminal: PropTypes.number,
};

export default SignalLevel;
