import React from "react";
import GaugeChart from "react-gauge-chart";
import { error, good, primaryColor, satisfactory, warning } from "../../style/ColorCode";
import "./MeterChart.scss";

interface MeterProps {
  label: string;
  value: number;
}
interface MeterChartProps {
  record: any;
}


const Meter: React.FC<MeterProps> = ({ label, value }) => {
  const percent = isNaN(value) || value === null ? 0 : value / 100;
  const getPointerColor = () => {
    if (value >= 81) return primaryColor;
    if (value >= 61) return good;
    if (value >= 46) return satisfactory;
    if (value >= 20) return warning;
    return error;
  };

  const chartStyle = {
    width: "220px", height: "100px"
  }
  return (

    <div className="meter">
      <div className="gauge-container">
        <GaugeChart
          id={`gauge-chart-${label}`}
          nrOfLevels={5}
          colors={["#FF4416", "#EE7200", "#ffc107", "#8bc34a", "#09B96D"]}
          arcWidth={0.2}
          percent={percent}
          textColor={getPointerColor()}
          hideText={true}
          style={chartStyle}
        />
        <div className="gauge-value" style={{ color: getPointerColor() }}>
          {value}%
        </div>
      </div>
      <div className="meter-label">{label}</div>
    </div>
  );
};

const MeterChart: React.FC<MeterChartProps> = ({ record }) => {
  return (
    <div className="meter-chart-container">
      <div className="meter-container">
        <div className="meter-card">
          <Meter label="Cyber Security" value={record?.cyberRiskScore} />
        </div>
        <div className="meter-card">
          <Meter label="Financial" value={record?.financialRiskScore} />
        </div>
        <div className="meter-card">
          <Meter label="Health & Safety" value={record?.healthScore} />
        </div>
      </div>
    </div>
  );
};

export default MeterChart;
