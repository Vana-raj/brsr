import React from 'react';
import './AnalyseChart.scss';
import DropdownInput from '../dropdown/CustomDropDown';
import { Bar } from 'react-chartjs-2';
import ScoreLineChart from '../scorelinechart/ScoreLineChart';

interface AnalyseCardProps {
  title: string;
  options?: any;
  value?: string;
  record?: any;
  onChange?: (value: string) => void;
}

const AnalyseChart: React.FC<AnalyseCardProps> = ({ title }) => {
  const getChartData = () => {
    if (title === "Total ESG Score : All Rating : Silver") {
      return {
        labels: ["1-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"],
        datasets: [
          {
            label: "Total ESG Score",
            data: [10, 20, 15, 25, 30, 20, 35, 25, 40, 50],
            backgroundColor: "#007bff",
          },
        ],
      };
    }
    if (title === "ESG Ratings : All Rating: Silver") {
      return {
        labels: ["A+", "A", "B", "C", "D"],
        datasets: [
          {
            label: "ESG Ratings",
            data: [50, 40, 30, 20, 10],
            backgroundColor: "#28a745",
          },
        ],
      };
    }
    if (title === "ECIX Rating : All Rating : Silver") {
      return {
        labels: ["A+", "A", "B", "C", "D"],
        datasets: [
          {
            label: "ECIX Ratings",
            data: [40, 30, 35, 25, 15],
            backgroundColor: "#dc3545",
          },
        ],
      };
    }
    return {
      labels: [],
      datasets: [],
    };
  };

  const options = {
    responsive: true,
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
          display: true,
          color: "#e5e5e5",
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

  const chartData = getChartData();

  return (
    <div className="card-main">
      <div className="analyse-card">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <div className="dropdown">
            <DropdownInput />
          </div>
        </div>
        <div className="chart-container">
          {(title === "Total ESG Score : All Rating : Silver" ||
            title === "ESG Ratings : All Rating: Silver" ||
            title === "ECIX Rating : All Rating : Silver") && (
              <Bar data={chartData} options={options} />
            )}

          {(title === "Avaerage Score Trend: Silver" || title === "Reports") &&
            <ScoreLineChart />}
        </div>
      </div>
    </div>
  );
};

export default AnalyseChart;
