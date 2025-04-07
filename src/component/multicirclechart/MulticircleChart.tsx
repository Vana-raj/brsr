import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DropdownInput from "../dropdown/CustomDropDown";
import { options as opt } from "../../utils/Options"
import "./MultiCircleChart.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

const CirclePercentage: React.FC = () => {
  const data = {
    labels: ["Energy", "Transportation", "Waste", "Others"],
    datasets: [
      {
        label: "Energy",
        data: [45, 55],
        backgroundColor: ["#09B96D", "#FFFFFF"],
        borderWidth: 0,
        cutout: "50%",
        borderRadius: 10,

      },
      {
        label: "Transportation",
        data: [25, 75],
        backgroundColor: ["#0058EA", "#FFFFFF"],
        borderWidth: 0,
        cutout: "38%",
        borderRadius: 10,

      },
      {
        label: "Waste",
        data: [20, 80],
        backgroundColor: ["#FF6A00", "#FFFFFF"],
        borderWidth: 0,
        cutout: "34",
        borderRadius: 10,

      },
      {
        label: "Others",
        data: [10, 90],
        backgroundColor: ["#FF4C4C", "#FFFFFF"],
        borderWidth: 0,
        cutout: "31%",
        borderRadius: 10,

      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: 180,
  };

  return (
    <div className="circle-percentage-card">
      <div className="chart-header">
        <h4>Emissions by Source</h4>
        <span className="time-period"><DropdownInput options={opt} /></span>
      </div>
      <div className="chart-flex">
        <div className="chart-container">
          <Doughnut data={data} options={options} />
        </div>
        <div className="chart-legend">
          <ul>
            <li>
              <span className="color-box1"></span> 45% Energy
            </li>
            <li>
              <span className="color-box2" ></span> 25% Transportation
            </li>
            <li>
              <span className="color-box3"></span> 20% Waste
            </li>
            <li>
              <span className="color-box4"></span> 10% Others
            </li>
          </ul>
          <p>(Tons CO₂/Unit)</p>
        </div>
      </div>

    </div>
  );
};

export default CirclePercentage;
