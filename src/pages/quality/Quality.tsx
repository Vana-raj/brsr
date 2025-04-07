import React, { useEffect, useState } from 'react'
import FinancialChart from '../../component/financialchart/FinancialChart';
import FinancialTable from '../../component/financialtable/FinancialTable';
import Loader from '../../component/loader/Loader';
import "./Quality.scss";
const Quality: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadData);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='quality-main'>
      <FinancialChart />
      <div className='quality-table'>
        <FinancialTable />
      </div>
    </div>
  )
}

export default Quality
