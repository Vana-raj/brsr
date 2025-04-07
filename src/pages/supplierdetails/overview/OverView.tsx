import React, { useEffect, useState } from "react";
import MeterCard from "../../../component/cards/MeterCard";
import DocumentCertificate from "./component/document/DocumentCertificate";
import { CertificateFillIcon, RevenueIcon, RatingIcon, ScoreIcon, HistoryIcon, AuditPassIcon } from "../../../utils/CardIcons";
import "./OverView.scss";



interface OverCardProps {
    title: string;
    type: string;
    description: string;
    growth: string;
    positiveFeedback: string;
    lastAudit: string;
    issues: string;
    completedOrders: string;
    validCertifications: string;
    buttonText: string;
    lastMonth: string;
    customerComplaints: string;
    nextAuditDue: string;
    lastReview: string;
    pendingOrders: string;
    expiredCertifications: string;
}
const OverView = () => {
    const [data, setData] = useState<any>(null);
    const [record, setRecord] = useState<any>(null);

    useEffect(() => {
        const storedRecord = localStorage.getItem("record");
        if (storedRecord) {
            setRecord(JSON.parse(storedRecord));
        }
    }, []);
    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            }
            )
            .catch((error) => console.error('Error fetching the data:', error));
    }, []);


    const getIconByType = (type: string) => {
        switch (type) {
            case "revenue":
                return <RevenueIcon />;
            case "performancefeedback":
                return <RatingIcon />;
            case "auditsinformation":
                return <AuditPassIcon />;
            case "suppliercompliance":
                return <ScoreIcon />;
            case "orderhistory":
                return <HistoryIcon />;
            case "certifications":
                return <CertificateFillIcon />;
            default:
                return null;
        }
    };
    return (
        <div className="overview-main">
            <div className="overview-top">
                <MeterCard type="overview" title={"Aeiforo Score"} record={record} />
                <MeterCard type="overview" title={"Risk Meter"} record={record} />
                <div className="overview-grid">
                    {data?.[2]?.data?.map((card: OverCardProps, index: number) => (
                        <div className="overview-card" key={card.buttonText}>
                            <div className="overview-card-content">
                                <div>
                                    {getIconByType(card.type)}
                                </div>
                                <div>
                                    <h4>{card.title}</h4>
                                    <p>{card.description}</p>
                                </div>
                            </div>
                            {card?.type === 'revenue' &&
                                <><div className="mini-text">Growth: {card?.growth}</div><div className="mini-text">Last Month: {card?.lastMonth}</div></>
                            }
                            {card?.type === 'performancefeedback' &&
                                <><div className="mini-text">Growth: {card?.positiveFeedback}</div><div className="mini-text">Last Month: {card?.customerComplaints}</div></>
                            }
                            {card?.type === 'auditsinformation' &&
                                <><div className="mini-text">Growth: {card?.lastAudit}</div><div className="mini-text">Last Month: {card?.nextAuditDue}</div></>
                            }
                            {card?.type === 'suppliercompliance' &&
                                <><div className="mini-text">Growth: {card?.issues}</div><div className="mini-text">Last Month: {card?.lastReview}</div></>
                            }
                            {card?.type === 'orderhistory' &&
                                <><div className="mini-text">Growth: {card?.completedOrders}</div><div className="mini-text">Last Month: {card?.pendingOrders}</div></>
                            }
                            {card?.type === 'certifications' &&
                                <><div className="mini-text">Growth: {card?.validCertifications}</div><div className="mini-text">Last Month: {card?.expiredCertifications}</div></>
                            }
                            <br />
                            <div className="con-btn">
                                <button>{card.buttonText}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DocumentCertificate record={record} />
        </div>

    );
};

export default OverView;
