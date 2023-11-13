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

function SignalLevel({ selectedRange }) {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/datas/signaltabData/signaltabData.json");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    return () => fetchData();
  }, []);

  // Check if selectedRange exists and has valid start and end dates
  if (
    selectedRange &&
    selectedRange.length === 2 &&
    selectedRange[0] &&
    selectedRange[1]
  ) {
    const [startDate, endDate] = selectedRange;
    const startTimestamp = startDate.unix(); // Assuming moment objects for startDate and endDate
    const endTimestamp = endDate.unix();

    // Filter data based on the selected date range
    const filteredData =
      jsonData?.data?.ts >= startTimestamp && jsonData?.data?.ts <= endTimestamp
        ? jsonData
        : null;

    const epochTimestamp = filteredData?.data?.ts;
    const date = new Date(epochTimestamp * 1000);
    const optionsDate = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = date.toLocaleDateString("en-US", optionsDate);

    const data = {
      labels: [
        formattedDate,
        formattedDate,
        formattedDate,
        formattedDate,
        formattedDate,
        formattedDate,
      ],
      datasets: [
        {
          label: "Signal Strength",
          data: [
            filteredData?.data?.signal,
            filteredData?.data?.signal,
            filteredData?.data?.signal,
            filteredData?.data?.signal,
            filteredData?.data?.signal,
            filteredData?.data?.signal,
          ],
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

  return null; // Return null if selectedRange is not valid
}

SignalLevel.propTypes = {
  selectedRange: PropTypes.array,
};

export default SignalLevel;
