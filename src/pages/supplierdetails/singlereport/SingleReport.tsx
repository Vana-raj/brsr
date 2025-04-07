import React, { useEffect, useState } from 'react';
import EmissionsChart from '../../../component/emissionschart/EmissionsChart';
import './SingleReport.scss';
import FinancialTable from '../../../component/financialtable/FinancialTable';
import AnalyseChart from '../../../component/analyseChart/AnalyseChart';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
import Loader from '../../../component/loader/Loader';
const SingleReport = () => {
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
        <div className='single-report'>
            <div className='report-main'>
                <div className='report-chart'>
                    <div className='report-emissionchart'>
                        <EmissionsChart title={'Reports'} />
                    </div>
                    <div className='report-multichart'>
                        <AnalyseChart title={"Reports"} />
                    </div>
                </div>
                <FinancialTable />
            </div>
            <div className='certificate-new'>
                <DocumentCertificate record={record} />
            </div>
        </div>

    )
}

export default SingleReport
