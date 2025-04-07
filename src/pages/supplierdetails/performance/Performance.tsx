import React, { useEffect, useState } from 'react'
import FinancialChart from '../../../component/financialchart/FinancialChart'
import PerformanceNavBar from '../../../component/performancenavbar/PerformanceNavBar'
import FinancialTable from '../../../component/financialtable/FinancialTable';
import Environmental from './environmental/Environmental';
import './Performance.scss'
const Performance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(
    localStorage.getItem("activeTab") ?? "Financial Results"
  );


  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div>
      <div>
        <PerformanceNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className='overall-main'>
        {activeTab === "Financial Results" && <FinancialChart />}
      </div>
      <div className='performance-table'>
        {activeTab === "Financial Results" && <FinancialTable />}
        {activeTab === "Environmental" && <Environmental />}
        {activeTab === "Business Ethics" && <Environmental />}
        {activeTab === "Health & Safety" && <Environmental />}
      </div>
    </div>
  )
}

export default Performance
