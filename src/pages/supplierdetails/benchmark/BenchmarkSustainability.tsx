import React, { useEffect, useState } from 'react';
import { Tabs, Progress, Typography } from 'antd';
import './BenchmarkSustainability.scss';
import CustomTable from '../../../component/table/CustomTable';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
import { error, good, primaryColor, satisfactory, warning } from '../../../style/ColorCode';
import BenchOverView from './overview/BenchOverView';
import OverViewProgress from './progress/Progress';
import Loader from '../../../component/loader/Loader';


const { TabPane } = Tabs;
const { Text } = Typography;

const BenchmarkSustainability: React.FC = () => {
    const [record, setRecord] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dataSource = [
        { key: '1', parameter: 'Energy Efficiency', benchmark: '85%', performance: '80%' },
        { key: '2', parameter: 'Water Usage', benchmark: '70%', performance: '65%' },
        { key: '3', parameter: 'Carbon Footprint', benchmark: '20%', performance: '18%' },
        { key: '4', parameter: 'Waste Management', benchmark: '55%', performance: '52%' },
    ];

    const getColor = (value: number) => {
        if (value > 80) return primaryColor;
        if (value > 60) return good;
        if (value > 45) return satisfactory;
        if (value >= 20) return warning;
        return error;
    };

    const columns = [
        { title: 'Parameter', dataIndex: 'parameter', key: 'parameter' },
        {
            title: 'Benchmark', dataIndex: 'benchmark', key: 'benchmark',
            render: (value: string) => {
                const numericValue = parseInt(value, 10);
                const color = getColor(numericValue);
                return (
                    <span style={{ color }}>
                        {value}
                    </span>
                );
            },
        },
        {
            title: 'Performance',
            dataIndex: 'performance',
            key: 'performance',
            render: (value: string) => {
                const numericValue = parseInt(value, 10);
                return (
                    <Progress
                        percent={numericValue}
                        size="small"
                        status="active"
                        strokeColor={getColor(numericValue)}
                    />
                );
            },
        },
    ];

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
        <div className='bench-flex'>
            <div className="benchmark-sustainability">
                <div className='bench'>Benchmark & Sustainability</div>
                <Text className="subtitle">
                    Industry benchmarks.
                </Text>
                <Tabs defaultActiveKey="1" className="tabs-container">
                    <TabPane tab="Overview" key="1">
                        <BenchOverView />
                    </TabPane>
                    <TabPane tab="Metrics" key="2">
                        <CustomTable
                            data={dataSource}
                            columns={columns}
                            pagination={false} />
                    </TabPane>
                    <TabPane tab="Progress" key="3">
                        <OverViewProgress />
                    </TabPane>
                </Tabs>
            </div>
            <div className='certificate-new'>
                <DocumentCertificate record={record} />
            </div>
        </div>
    );
};

export default BenchmarkSustainability;
