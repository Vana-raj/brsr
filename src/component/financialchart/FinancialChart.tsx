import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import DropdownInput from "../dropdown/CustomDropDown";
import { options as opt } from "../../utils/Options"
import { bgColor, blue, primaryColor, secondaryColor } from '../../style/ColorCode';
import "./FinancialChart.scss";
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const FinancialChart: React.FC = () => {
  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        type: "bar",
        label: "Sales Revenue",
        data: [20, 40, 60, 80, 100, 20, 40, 60, 80, 100],
        backgroundColor: primaryColor,
        borderColor: primaryColor,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        type: "bar",
        label: "Pre-Tax Profit",
        data: [15, 30, 50, 70, 90, 120, 20, 40, 60, 80, 100],
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderRadius: 5,
        borderSkipped: false,
      },
      {
        type: "line",
        label: "Profit After Tax",
        data: [25, 45, 65, 85, 105, 145, 25, 45, 65, 85, 105, 145],
        borderColor: blue,
        backgroundColor: primaryColor,
        pointBackgroundColor: primaryColor,
        pointBorderColor: bgColor,
        tension: 0.5,
        pointRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 5.5,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset: any, index: number) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              lineWidth: dataset.borderWidth,
              hidden: !chart.isDatasetVisible(index),
              index: index,
              pointStyle: dataset.label === "Profit After Tax" ? "circle" : "rectRounded",
              datasetIndex: index,
            }));
          },
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ccc",
        borderWidth: 1,
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
            size: 14,
          },
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "#ECECEC",
        },
        ticks: {
          stepSize: 20,
          color: "#636363",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="emissions-card">
      <div className="card-header">
        <div className="title">Emissions Over Time</div>
        <div>
          <DropdownInput options={opt} />
        </div>
      </div>
      <div className="chart-container">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancialChart;
