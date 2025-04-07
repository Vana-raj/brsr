import React from 'react';
import { Line } from 'react-chartjs-2';

interface ScoreLineProps {}

const ScoreLineChart: React.FC<ScoreLineProps> = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total",
        data: [100, 70, 80, 70, 70, 60, 90, 80, 50, 80, 70, 80],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        pointBackgroundColor: "#007bff",
        pointBorderColor: "#007bff",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "Env",
        data: [90, 60, 70, 60, 40, 60, 50, 40, 20, 20, 10, 5],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        pointBackgroundColor: "#28a745",
        pointBorderColor: "#28a745",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "Gov",
        data: [80, 50, 60, 50, 50, 40, 60, 30, 10, 10, 5, 2],
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        pointBackgroundColor: "#ffc107",
        pointBorderColor: "#ffc107",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: " Soc",
        data: [70, 40, 50, 40, 20, 30, 70, 60, 40, 30, 25, 15],
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        pointBackgroundColor: "#dc3545",
        pointBorderColor: "#dc3545",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#636363",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#636363",
          font: {
            size: 15,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#636363",
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ScoreLineChart;
