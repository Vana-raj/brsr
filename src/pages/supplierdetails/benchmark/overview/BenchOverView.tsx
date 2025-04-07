import React from 'react';
import { Card, Typography } from 'antd';
import './BenchOverView.scss';

const { Title, Text } = Typography;

interface BenchOverViewProps { }

const BenchOverView: React.FC<BenchOverViewProps> = () => {
    return (
        <div>
            <Card className="info-card">
                <Title level={4}>Sustainability Goals</Title>
                <Text>
                    Sustainability is the key to a better future. Track your energy efficiency, water usage,
                    carbon footprint, and waste management.
                </Text>

                <div className="details-card">
                    <div className="goal-section">
                        <Title level={5} className="section-header">Energy Efficiency</Title>
                        <Text>
                            Optimize energy consumption by embracing renewable energy sources, upgrading to energy-efficient
                            equipment, and reducing wastage. Small changes in energy usage can lead to significant reductions in carbon emissions.
                        </Text>
                    </div>
                    <div className="goal-section">
                        <Title level={5} className="section-header">Water Usage</Title>
                        <Text>
                            Water is a precious resource, and managing it wisely is crucial. Monitor usage patterns, recycle
                            water wherever possible, and implement efficient irrigation systems to conserve this vital resource.
                        </Text>
                    </div>
                    <div className="goal-section">
                        <Title level={5} className="section-header">Carbon Footprint</Title>
                        <Text>
                            Track and minimize greenhouse gas emissions by transitioning to cleaner technologies, reducing dependence
                            on fossil fuels, and engaging in carbon offset projects. Every effort counts in the global fight against climate change.
                        </Text>
                    </div>
                    <div className="goal-section">
                        <Title level={5} className="section-header">Waste Management</Title>
                        <Text>
                            Proper waste management isn't just about disposal; it's about minimizing waste at the source. Adopt practices
                            such as recycling, composting, and repurposing materials to reduce the burden on landfills and oceans.
                        </Text>
                    </div>
                </div>
            </Card>


        </div>
    );
};

export default BenchOverView;
