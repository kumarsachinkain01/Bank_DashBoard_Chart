// src/PieChart.js

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import './App';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Loan Breakdown",
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
