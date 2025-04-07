import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import EnvironmentIcon from "../../assets/icons/EnvironmentIcon.svg";
import SocialIcon from "../../assets/icons/SocialIcon.svg";
import GovernanceIcon from "../../assets/icons/GovernanceIcon.svg";
import FinanceIcon from "../../assets/icons/CoinsIcon.svg";
import HealthSafetyIcon from "../../assets/icons/HealthIcon.svg";

import './BarChart.scss';

interface BarChartProps {
  record: any;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BarChart: React.FC<BarChartProps> = ({ record }) => {
  const getBackgroundColor = (percentage: number) => {
    if (percentage >= 81) return "#4caf50";
    if (percentage >= 61) return "#8bc34a";
    if (percentage >= 46) return "#ffc107";
    if (percentage >= 21) return "#ff9800";
    return "#f44336";
  };

  const data = {
    labels: ["Environment", "Social", "Governance", "Finance", "Health & Safety"],
    datasets: [
      {
        data: [
          record?.environment,
          record?.social,
          record?.governance,
          record?.financialRiskScore,
          record?.healthSafety,
        ],
        backgroundColor: [
          getBackgroundColor(record?.environment),
          getBackgroundColor(record?.social),
          getBackgroundColor(record?.governance),
          getBackgroundColor(record?.financialRiskScore),
          getBackgroundColor(record?.healthSafety),
        ],
        borderRadius: 15,
        barPercentage: 0.8,
      },
    ],
  };

  const options: any = {
    indexAxis: "x" as const,
    scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          callback: () => "",
        },
      },
      y: {
        display: false,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const plugins = [
    {
      id: "add-icons",
      afterDraw: (chart: any) => {
        const { ctx, scales, chartArea } = chart;
        if (!chartArea) return;

        const icons = [
          EnvironmentIcon,
          SocialIcon,
          GovernanceIcon,
          FinanceIcon,
          HealthSafetyIcon,
        ];

        const barWidth = (scales.x.width - scales.x.paddingLeft) / icons.length;
        const xStart = scales.x.left;

        icons.forEach((iconSrc, index) => {
          const xPosition = xStart + barWidth * index + barWidth / 2;
          const yPosition = chartArea.bottom + 10;

          const img: any = new Image();
          img.src = iconSrc;
          img.onload = () => {
            ctx.drawImage(img, xPosition - 8, yPosition, 16, 16);
          };
        });
      },
    },
  ];

  return (
    <div className="chart-container">
      <Bar data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default BarChart;
