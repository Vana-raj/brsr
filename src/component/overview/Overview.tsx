import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import overview1 from '../../assets/images/overview1.png';
import overview2 from '../../assets/images/overview2.png';
import './Overview.scss';

interface OverviewItem {
    title: string;
    aosDelay?: string;
}

interface OverviewData {
    image: string;
    subTitle: string;
    title: string;
    aosDelay?: string;
    overviewList: OverviewItem[];
}

const Overview: React.FC = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const softwareIntegrationsData: OverviewData[] = [
        {
            image: overview1,
            subTitle: "Software Integrations",
            title: "Designed for Sustainability, Built for Compliance",
            aosDelay: "100",
            overviewList: [
                { title: 'BRSR Standards Integration (BRSR 1, 2, 3)', aosDelay: '200' },
                { title: 'Automated data ingestion from ERP, IoT', aosDelay: '300' },
                { title: 'Role-based access & digital signatures', aosDelay: '400' },
                { title: 'Audit trail with blockchain hash references', aosDelay: '500' },
                { title: 'Export reports in PDF,XBRL', aosDelay: '600' },
            ],
        },
    ];

    return (
        <section className="overview-section">
            <div className="overview-container">
                {softwareIntegrationsData.map((value, index) => (
                    <div className="overview-card" key={`software-${index}`}>
                        <div className="overview-grid">
                            <div
                                className="overview-image-container"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                            >
                                <img
                                    src={value.image}
                                    alt="Software Integrations"
                                    className="overview-image"
                                />
                            </div>

                            <div className="overview-content">
                                <span
                                    className="overview-subtitle"
                                    data-aos="fade-in"
                                    data-aos-delay={value.aosDelay}
                                >
                                    {value.subTitle}
                                </span>
                                <h2
                                    className="overview-title"
                                    data-aos="fade-in"
                                    data-aos-delay="150"
                                >
                                    {value.title}
                                </h2>

                                <ul className="overview-list">
                                    {value.overviewList.map((item, index) => (
                                        <li
                                            key={index}
                                            className="overview-card"
                                            data-aos="fade-up"
                                            data-aos-duration="800"
                                            data-aos-delay={item.aosDelay}
                                        >
                                            <div className="card-content">
                                                <i className="fa-solid fa-check"></i>
                                                <span>{item.title}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Overview;