// import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

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
    labels: [formattedDate],
    datasets: [
      {
        label: "Signal Strength",
        data: [5],
        borderColor: "black",
        borderWidth: "1px",
        backgroundColor: "#46B39E",
        stack: "stack1",
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    scales: {
      x: {
        categorySpacing: 0,
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        min: 1, // Set the minimum value on the y-axis
        max: 6, // Set the maximum value on the y-axis
        ticks: {
          stepSize: 1, // Set the step size for the ticks
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <div>
      <p>Timestamp: {formattedDate}</p>
      <p>Signal Strength: {data.datasets[0].data[0]}</p>
      <p>Raw Data: status -s</p>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SignalLevel;
