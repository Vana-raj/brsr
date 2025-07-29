import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HelpDesk.scss";

import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";

import { useEffect } from "react";

const servicesData = [
    {
        icon: icon1,
        title: "Immutable Records",
        shortText:
            "All disclosures are timestamped and locked on the blockchain, ensuring transparency and audit-readiness.",
        viewDetails: "#",
        aosDelay: "100",
    },
    {
        icon: icon2,
        title: "Automated Data Assurance",
        shortText:
            "Smart contracts validate inputs against BRSR Standards to prevent greenwashing or human error.",
        viewDetails: "#",
        aosDelay: "200",
    },
    {
        icon: icon3,
        title: "Real-Time Stakeholder Access",
        shortText:
            "Give investors, auditors, and regulators instant, permissioned access to sustainability reports.",
        viewDetails: "#",
        aosDelay: "300",
    },
    {
        icon: icon4,
        title: "Future-Proofing ESG Reports",
        shortText:
            "With growing ESG scrutiny and digital assurance trends, blockchain-readiness positions.",
        viewDetails: "#",
        aosDelay: "400",
    },
];

const HelpDesk: React.FC = () => {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    return (
        <div className="helpdesk-section ptb-100">
            <div className="container">
                <div className="section-title">
                    <h2>Why Blockchain for BRSR?</h2>
                </div>

                <div className="row">
                    {servicesData.map((item, i) => (
                        <div
                            className="col"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={item.aosDelay}
                            key={i}
                        >
                            <div className="helpdesk-card">
                                <div className="icon">
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.shortText}</p>
                                <a href={item.viewDetails} className="link-btn">
                                    Learn More <i className="fa-solid fa-angle-right"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpDesk;
