import React, { useEffect, useState } from "react";
import { Row, Col, Card, Progress } from "antd";
import { Line, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.scss";
import { primaryColor } from "../../style/ColorCode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const radarData = {
    labels: ["P1", "P2", "P3", "P4", "P8", "P9"],
    datasets: [
      {
        label: "Radar im",
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        borderColor: primaryColor,
        pointBackgroundColor: primaryColor,
      },
      {
        label: "Eggrevt consumit",
        data: [28, 48, 40, 19, 96, 27],
        backgroundColor: "rgba(160, 196, 255, 0.2)",
        borderColor: "#a0c4ff",
        pointBackgroundColor: "#a0c4ff",
      },
    ],
  };

  const doughnutData = {
    labels: ["Women Employees", "Other"],
    datasets: [
      {
        data: [35, 65],
        backgroundColor: [primaryColor, "#e5e5e5"],
        borderWidth: 0,
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerTextPlugin",
    beforeDraw: function (chart: any) {
      const { width, height, ctx } = chart;
      ctx.restore();

      const fontSize = (height / 100).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";

      const text = "35%";
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillStyle = primaryColor;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };


  const lineData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Emissions",
        data: [10, 12, 9, 14, 18, 20, 19, 21, 23, 25, 24, 28],
        borderColor: primaryColor,
        tension: 0.4,
        fill: false,
      },
      {
        label: "Energy Consumption",
        data: [6, 7, 5, 8, 10, 11, 10, 12, 13, 14, 15, 17],
        borderColor: "#a0c4ff",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  console.log(walletAddress,'walletAddress')

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">BRSR Dashboard</h2>

      {/* Top Two Rows: Left column (two rows) + Radar Card on right */}
      <Row gutter={[16, 16]} className="top-two-rows">
        <Col span={18} className="top-two-columns">
          <Row gutter={[16, 16]} className="row1">
            <Col span={8}>
              <Card className="small-card">
                <h3>85%</h3>
                <p>Overall Compliance</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="small-card">
                <h3>245</h3>
                <p>Total Metrics</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="small-card">
                <h3>16</h3>
                <p>Missing Entries</p>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="row2">
            <Col span={8}>
              <Card className="horizontal-card">
                <div>
                  <h4>P1 Business Ethics</h4>
                </div>
                <div>
                  <Progress percent={80}
                    strokeWidth={15}
                    showInfo={false} strokeColor={primaryColor} />
                  <Progress percent={60}
                    strokeWidth={15}
                    showInfo={false} strokeColor={primaryColor} />
                  <Progress percent={40}
                    strokeWidth={15}
                    showInfo={false} strokeColor={primaryColor} />
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="horizontal-card">
                <h4>P2 Sustainability</h4>
                <div className="chart-wrapper">
                  <Doughnut
                    data={doughnutData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="horizontal-card">
                <h4>P3 Employee Well-bg</h4>
                <Progress percent={70}
                  strokeWidth={15}
                  showInfo={false} strokeColor={primaryColor} />
                <Progress percent={8}
                  strokeWidth={15}
                  showInfo={false} strokeColor={primaryColor} />
                <Progress percent={90}
                  strokeWidth={15}
                  showInfo={false} strokeColor={primaryColor} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card className="radar-card">
            <div className="chart-wrapper">
              <Radar
                data={radarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
            <div className="radar-legend">
              <p>
                <span className="dot dot-blue"></span> Radar im – 84 cm
              </p>
              <p>
                <span className="dot dot-purple"></span> Eggrevt consumit
              </p>
            </div>
          </Card>
        </Col>

      </Row>

      {/* Third Row: Full-Width Row with Three Cards */}
      <Row gutter={[16, 16]} className="bottom-row">
        <Col span={8}>
          <Card className="line-chart-card">
            <h4>Emissions & Energy Consumption</h4>
            <div className="chart-wrapper">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="chart-card">
            <h4>Diversity & Inclusion</h4>
            <div className="chart-wrapper">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                }}
                plugins={[centerTextPlugin]}
              />

            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="table-card">
            <h4>Disclosures</h4>
            <table className="disclosure-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Fiscal Year</th>
                  <th>Business Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Example</td>
                  <td>2023-24</td>
                  <td>BU1</td>
                </tr>
                <tr>
                  <td>Example</td>
                  <td>2023-23</td>
                  <td>BU1</td>
                </tr>
                <tr>
                  <td>Example</td>
                  <td>2023-24</td>
                  <td>Completed</td>
                </tr>
                <tr>
                  <td>Example</td>
                  <td>2022-23</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
