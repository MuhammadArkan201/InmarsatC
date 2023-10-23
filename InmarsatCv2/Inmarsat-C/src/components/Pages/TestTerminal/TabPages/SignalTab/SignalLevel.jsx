import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import "../../../../../App.css";

const epochTimestamp = 1697159325;
const date = new Date(epochTimestamp * 1000);
const optionsDate = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

function SignalLevel() {
  const formattedDate = date.toLocaleDateString("en-US", optionsDate);

  const data = {
    labels: [formattedDate,formattedDate,formattedDate,formattedDate,formattedDate,formattedDate],
    datasets: [
      {
        label: "Signal Strength",
        data: [5, 5, 5, 5, 5,5],
        backgroundColor: "#46B39E",
        stack: "stack1",
        barPercentage: 1,
        categoryPercentage:1,
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

export default SignalLevel;
