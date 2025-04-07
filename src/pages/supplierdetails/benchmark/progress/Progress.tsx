import React from 'react'
import { Typography, Progress } from 'antd';
import NormalCard from '../../../../component/cards/normalcard/NormalCard';
import './Progress.scss';
const { Title, Text } = Typography;
const OverViewProgress: React.FC = () => {

    const content1 = (
        <div className="progress-card">
            <div className="progress-circle">
                <Progress
                    type="circle"
                    percent={80}
                    strokeColor="#09B96D"
                    trailColor="#E0E0E0"
                    strokeWidth={10}
                />
            </div>
            <div className="progress-details">
                <Text className="metric-name">Energy Efficiency </Text>
                <Text className="metric-value"> 80%</Text>
            </div>
        </div>
    );

    const content2 = (
        <div className="progress-card">
            <div className="progress-circle">
                <Progress
                    type="circle"
                    percent={65}
                    strokeColor="#8BC34A"
                    trailColor="#E0E0E0"
                    strokeWidth={10}
                />
            </div>
            <div className="progress-details">
                <Text className="metric-name">Water Usage </Text>
                <Text className="metric-value">65%</Text>
            </div>
        </div>
    );

    const content3 = (
        <div className="progress-card">
            <div className="progress-circle">
                <Progress
                    type="circle"
                    percent={48}
                    strokeColor="#FFC107"
                    trailColor="#E0E0E0"
                    strokeWidth={10}

                />
            </div>
            <div className="progress-details">
                <Text className="metric-name">Carbon Footprint </Text>
                <Text className="metric-value">48%</Text>
            </div>
        </div>
    );


    const content4 = (
        <div className="progress-card">
            <div className="progress-circle">
                <Progress
                    type="circle"
                    percent={72}
                    strokeColor="#09B96D"
                    trailColor="#E0E0E0"
                    strokeWidth={10}

                />
            </div>
            <div className="progress-details">
                <Text className="metric-name">Waste Management </Text>
                <Text className="metric-value">72%</Text>
            </div>
        </div>
    )
    return (

        <div className="progress-overview">
            <div className="progress-header">
                <Title level={4}>Progress Overview</Title>
                <Text className="progress-description">
                    A detailed view of the progress made in various sustainability benchmarks.
                </Text>
            </div>
            <div className="progress-cards">
                <NormalCard content={content1} />
                <NormalCard content={content2} />
                <NormalCard content={content3} />
                <NormalCard content={content4} />
            </div>
        </div>
    )
}

export default OverViewProgress
