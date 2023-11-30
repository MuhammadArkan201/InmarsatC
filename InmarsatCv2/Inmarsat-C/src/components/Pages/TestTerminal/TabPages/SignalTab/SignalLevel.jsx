// SignalLevel.jsx

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
import "../../../../../App.css";
import "./SignalLevel.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/historical_snr?dest=${selectedTerminal}`,
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

    // Flatten the array of timestamp-value pairs
    const flattenedData = jsonData.flatMap((item) => item.data);

    // Filter data based on the selected date range
    const filteredData = flattenedData.filter(
      (pair) => pair[0] >= startTimestamp && pair[0] <= endTimestamp
    );

    if (filteredData.length > 0) {
      const labels = filteredData.map((pair) => {
        const epochTimestamp = pair[0];
        const date = new Date(epochTimestamp * 1000);

        // Format date, hour, and minute
        const formattedDate = date.toLocaleDateString("en-US");
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        return `${formattedDate} ${formattedTime}`;
      });

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Signal Strength",
            data: filteredData.map((pair) => pair[1]),
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

      // Dynamically set the container width if there are more than 10 labels
      const containerWidth = labels.length > 10 ? labels.length * 50 : null;

      return (
        <div className="chart-container">
          <div className="containerBody" style={{containerWidth}}>
            <Bar data={data} options={options} />
          </div>
        </div>
      );
    }
  }

  return null;
}

SignalLevel.propTypes = {
  selectedRange: PropTypes.array,
  selectedTerminal: PropTypes.number,
};

export default SignalLevel;
