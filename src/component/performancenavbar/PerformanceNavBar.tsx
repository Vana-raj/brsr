import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import "./PerformanceNavBar.scss";

interface PerformanceNavBarProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const PerformanceNavBar: React.FC<PerformanceNavBarProps> = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabs = [
    { key: "Financial Results", label: "Financial Results" },
    { key: "Health & Safety", label: "Health & Safety" },
    { key: "Environmental", label: "Environmental" },
    { key: "Business Ethics", label: "Business Ethics" },
  ];

  return (
    <div className="performance-navbar-tabs">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        tabBarGutter={16}
        tabBarStyle={{ marginBottom: 0 }}
      >
        {tabs.map((tab) => (
          <Tabs.TabPane
            tab={
              <Link
                to={""}
                className={activeTab === tab.key ? "active-tab" : ""}
              >
                {tab.label}
              </Link>
            }
            key={tab.key}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default PerformanceNavBar;
