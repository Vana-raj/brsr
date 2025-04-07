import React, { useEffect, useState } from 'react';
import './Carbon.scss';
import EmissionsChart from '../../../component/emissionschart/EmissionsChart';
import MultiCircleChart from '../../../component/multicirclechart/MulticircleChart';
import CustomTable from '../../../component/table/CustomTable';
import Loader from '../../../component/loader/Loader';

const Carbon: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      sorter: (a: any, b: any) => a.source?.localeCompare(b.source),
    },
    {
      title: 'Emissions (Tons CO₂)',
      dataIndex: 'emissions',
      key: 'emissions',
      sorter: (a: any, b: any) => a.emissions?.localeCompare(b.emissions),
    }, {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      sorter: (a: any, b: any) => a.industry?.localeCompare(b.industry),
    }, {
      title: 'Mitigation Actions',
      dataIndex: 'mitigation',
      key: 'mitigation',
      sorter: (a: any, b: any) => a.industry?.localeCompare(b.industry),
    },
  ];

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='carbon-main'>
      <div className='carbon-title'>Carbon Footprint</div>
      <div className="carbon-first-card">
        {data?.[4]?.cards?.map((item: any) => (
          <div className="carbon-cards" key={item?.title}>
            <div className="card-title">{item?.title}</div>
            {item?.totalEmissions && <div className="card-content-text">{item?.totalEmissions}</div>}
            {item?.totalEmissionsTons && <div className="card-mini-text">{item?.totalEmissionsTons}</div>}
            {item?.yearlyReduction && <div className="card-content-text">{item?.yearlyReduction}</div>}
            {item?.carbonIntensity && (
              <div className="card-content-text">
                {item?.carbonIntensity} <div className="card-mini-text">{item?.carbonUnit}</div>
              </div>

            )}
            {item?.renewableEnergyUse && <div className="card-content-text">{item?.renewableEnergyUse}</div>}
          </div>
        ))}
      </div>
      <div className='chart-flex'>
        <div className='chart-content'>
          <EmissionsChart title={'Emissions Over Time'} />
        </div>
        <div>
          <div>
            <MultiCircleChart />
          </div>
        </div>
      </div>
      <div>
        <CustomTable
          title="Emission Details"
          columns={columns}
          data={data?.[5]?.data.map((row: any, index: number) => ({
            ...row,
            key: row.key || index,
          }))}
          bordered={false}
          pagination={true}
        />
      </div>
    </div>

  );
};

export default Carbon;
