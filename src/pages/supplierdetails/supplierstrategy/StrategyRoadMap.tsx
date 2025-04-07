import React, { useEffect, useState } from "react";
import { Timeline } from "antd";
import "./StrategyRoadMap.scss";
import DocumentCertificate from "../overview/component/document/DocumentCertificate";
import Loader from "../../../component/loader/Loader";

const StrategyRoadMap: React.FC = () => {

    const strategies = [
        {
            title: "Energy Efficiency",
            description: "Reduce energy consumption through optimized operations and technology upgrades.",
        },
        {
            title: "Sustainable Sourcing",
            description: "Collaborate with suppliers to ensure eco-friendly raw materials and sustainable practices.",
        },
        {
            title: "Innovation",
            description: "Invest in R&D to develop greener products and processes.",
        },
        {
            title: "Community Engagement",
            description: "Partner with communities to promote environmental awareness and sustainability education.",
        },
    ];

    const [record, setRecord] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const storedRecord = localStorage.getItem("record");
            if (storedRecord) {
                setRecord(JSON.parse(storedRecord));
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="strategy-flex">
            <div className="strategy-road-map">
                <div className="title-section">
                    <h1>Supplier's Strategy and Road-Map</h1>
                    <p>
                        A comprehensive plan to achieve sustainability and long-term growth while addressing environmental, social, and governance (ESG) goals.
                    </p>
                </div>

                <div className="content-section">
                    <div className="timeline-section">
                        <h2>Milestones</h2>
                        <Timeline mode="right">
                            {record?.history?.map((milestone: { achivement: '', years: '' }, index: number) => (
                                <Timeline.Item key={index} label={milestone.years}>
                                    {milestone.achivement}
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </div>

                    <div className="strategy-cards">
                        <h2>Key Strategies</h2>
                        <div className="cards-container">
                            {strategies.map((strategy, index) => (
                                <div className="card-div" key={index} title={strategy.title} >
                                    <p>{strategy.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='certificate-new'>
                <DocumentCertificate record={record} />
            </div>
        </div>
    );
};

export default StrategyRoadMap;
