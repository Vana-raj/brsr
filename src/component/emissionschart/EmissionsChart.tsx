import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DropdownInput from "../dropdown/CustomDropDown";
import { options as opt } from "../../utils/Options"
import "./EmissionsChart.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface EmissionsChartProps {
  title?: string
}
const EmissionsChart: React.FC<EmissionsChartProps> = ({ title }) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Emissions",
        data: [100, 70, 80, 70, 30, 50, 40, 50, 30, 30, 20, 10],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        pointBackgroundColor: "#007bff",
        pointBorderColor: "#007bff",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 3.0,
    plugins: {
      legend: {
        display: false,
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
    <div className="emissions-chart-container">
      <div className="chart-title">
        <div>{title}</div>
        <div>
          <DropdownInput options={opt} />
        </div>
      </div>


      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EmissionsChart;
