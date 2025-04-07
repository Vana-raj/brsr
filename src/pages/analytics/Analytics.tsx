import React, { useState, useEffect } from 'react';
import './Analytics.scss';
import FinancialTable from '../../component/financialtable/FinancialTable';
import Loader from '../../component/loader/Loader';
import Analyse from '../supplierdetails/analyse/Analyse';

const Analytics: React.FC = () => {
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
    <div className="analytics-main">
      <Analyse />
      <div className="analytics-table">
        <FinancialTable />
      </div>
    </div>
  );
};

export default Analytics;
