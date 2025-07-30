import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, Dropdown, Menu } from "antd";
import { DownOutlined, ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { GlobalIconComponent, HomeIconComponent, MailIconComponent } from "../../utils/ContactIcons";
import { ShareComponent } from "../../component/sharesocial/ShareSocial";
import "./DetailsNavBar.scss";
import MainNavBar from "../navbar/NavBar";

interface NavBarProps {
  activeLink: string;
  setActiveLink: (linkName: string) => void;
  id?: string;
  record: any;
  type?: string;
}

interface TabItem {
  name: string;
  label: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeLink, setActiveLink, id, record }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs: TabItem[] = [
    { name: "overview", label: "Overall Reports" },
    { name: "company", label: "Company" },
    { name: "products&services", label: "Products & Services" },
    { name: "location", label: "Location" },
    { name: "governance", label: "Governance and Certifications" },
    { name: "carbon", label: "Emissions" },
    { name: "performance", label: "Offsets and Performance" },
    { name: "analyse", label: "Analyse" },
    { name: "reports", label: "Reports" },
    { name: "waste-consumption", label: "Waste & Consumption" },
    { name: "benchmark-sustainability", label: "Benchmark for Sustainability" },
    { name: "strategy-road-map", label: "Strategy & Road-Map" },
  ];

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  const goBackToDash = () => {
    localStorage.removeItem("record");
    localStorage.removeItem("activeTab");
    navigate("/brsr/dashboard");
  };

  const visibleTabs = isMobile ? tabs.slice(0, 3) : tabs.slice(0, 8);
  const overflowTabs = isMobile ? tabs.slice(3) : tabs.slice(8);

  const overflowMenu = (
    <Menu>
      {overflowTabs.map((tab) => (
        <Menu.Item key={tab.name}>
          <Link to={`/supplier/${id}/${tab.name}`} onClick={() => handleLinkClick(tab.name)}>
            {tab.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const tabItems = visibleTabs.map((tab) => ({
    label: (
      <Link
        to={`/supplier/${id}/${tab.name}`}
        className={activeLink === tab.name ? "active" : ""}
      >
        {tab.label}
      </Link>
    ),
    key: tab.name,
  }));

  return (
    <>
      <MainNavBar />
      <div className="navbar-2">
        <div className="heading">
          <ArrowLeftOutlined onClick={goBackToDash} />{" "}
          <div>{record?.supplier}</div>
          <div className="qualify">
            <CheckOutlined /> Qualified
          </div>
        </div>
        <div className="contact-nav">
          <div className="contact-home">
            <HomeIconComponent />
            India
          </div>
          <div className="contact-home">
            <a className="email-link" href="mailto:Gamesupport@Gridlogic.in">
              <MailIconComponent /> {record?.email}
            </a>
          </div>
          <div className="contact-home">
            <GlobalIconComponent />
            <div onClick={() => window.open(record?.website, '_blank')} role="button">
              {record?.websiteName}
            </div>
          </div>
          <div className="contact-home">ID: {record?.companyId}</div>
          <div className="contact-home">
            <ShareComponent />
          </div>
        </div>
      </div>
      <div className="detail-nav">
        <Tabs
          activeKey={activeLink}
          onChange={(key) => handleLinkClick(key)}
          tabBarExtraContent={
            overflowTabs.length > 0 && (
              <Dropdown overlay={overflowMenu} placement="bottomRight" trigger={["click"]}>
                <span className="more-tabs">
                  More <DownOutlined />
                </span>
              </Dropdown>
            )
          }
          tabBarGutter={12}
          items={tabItems}
        />
      </div>
    </>
  );
};

export default NavBar;
