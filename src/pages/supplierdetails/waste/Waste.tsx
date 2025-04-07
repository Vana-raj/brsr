import React, { useEffect, useState } from 'react';
import './Waste.scss';
import NormalChart from '../../../component/normalchart/NormalChart';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
import Loader from '../../../component/loader/Loader';

const Waste = () => {
    const wasteData = {
        waste: 40,
        consumption: 60,
        title: "Waste & Consumption",
        label1: "Waste",
        label2: "Consumption"
    };

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
        <div className='waste-main'>
            <div className='circle-chart'>
                <div className='waste-title'>Waste & Consumption</div>
                <div className='waste-chart'>
                    <NormalChart data={wasteData} />
                </div>
            </div>
            <div className='certificate-new'>
                <DocumentCertificate record={record} />
            </div>
        </div>
    );
};

export default Waste;
