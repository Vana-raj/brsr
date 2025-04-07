import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./CirclePercentage.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularChartProps {
  percentageCompleted: number;
  percentageRemaining: number;
  percentageMiddle?: number;
  type?: string;
  score?: number;
}

const CircularChart: React.FC<CircularChartProps> = ({
  percentageCompleted,
  percentageRemaining,
  percentageMiddle = 50,
  type,
  score,
}) => {
  const getBackgroundColor = (percentage: number, type: string) => {
    let color;
    if (percentage >= 81) {
      color = "#4caf50";
    } else if (percentage >= 61) {
      color = "#8bc34a";
    } else if (percentage >= 46) {
      color = "#ffc107";
    } else if (percentage >= 21) {
      color = "#ff9800";
    } else {
      color = "#f44336";
    }

    return type === "overview" ? [color, "#ffff"] : ["#09B96D", "#ffff"];
  };

  const getClassName = (percentage: number, type: string) => {
    if (type !== "overview") {
      return "remaining-percentage";
    }

    if (percentage >= 81) {
      return "remaining-percentage";
    } else if (percentage >= 61) {
      return "remaining-percentage2";
    } else if (percentage >= 46) {
      return "remaining-percentage5";
    } else if (percentage >= 21) {
      return "remaining-percentage4";
    } else {
      return "remaining-percentage6";
    }
  };

  const chartData = {
    datasets: [
      {
        data: [percentageRemaining, 100 - percentageRemaining],
        backgroundColor: getBackgroundColor(percentageRemaining, type || ''),
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 10,
        weight: 3,
      },
      {
        data: [percentageMiddle, 100 - percentageMiddle],
        backgroundColor: ["#ec70b4", "#ffff"],
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 10,
        weight: 3,
      },
      {
        data: [percentageCompleted, 100 - percentageCompleted],
        backgroundColor: ["#0058EA", "#ffff"],
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 10,
        weight: 3,
      },
    ],
  };

  const chartOptions = {
    cutout: "55%",
    radius: "90%",
    responsive: true,
    rotation: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#ffffff',
        spacing: 0,
      },
    },
  };

  return (
    <div className="circular-chart-container">
      <Doughnut data={chartData} options={chartOptions} />
      <div className="circular-chart-label">
        <span className={getClassName(percentageRemaining, type || '')}>
          {percentageRemaining}%
        </span>
        <div className="middle-percentage">{percentageMiddle}%</div>
        {type !== 'overview' && (
          <span className="completed-percentage">
            {percentageCompleted}%
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularChart;
